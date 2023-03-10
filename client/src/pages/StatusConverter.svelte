<script lang="ts">
    import {createEventDispatcher, onMount, setContext} from "svelte";
    import {
        loadConvertersGlobal,
        addConverter,
        removeConverter,
        editConverter,
        isValidConverter, validateConverterUpdate, loadClientConverters, loadSelectConverters, loadSelectedData
    } from "../scripts/converterScript";
    import Modal from "../Components/Modal.svelte";
    import {apiData} from "../stores/store.ts";
    import Pagination from "../components/Pagination.svelte"

    const dispatch = createEventDispatcher();

    let loading = false;
    let page = 0;
    let pageIndex = 0;
    let pageSize = 10;
    let responsive = true;
    let rows = [];
    let serverSide = false;

    onMount(()=> {
        if(localStorage.getItem('role') === 'CompanyAdmin'){
            loadSelectConverters(localStorage.getItem('company_id'))

        } else if (localStorage.getItem('role') === 'GlobalAdmin'){
            loadConvertersGlobal()
        }
        else if (localStorage.getItem('role') === 'Client'){
            loadClientConverters(localStorage.getItem('id'));
        }
    })

    let showEditPopup = false;
    let showAddPopup = false;
    let showDeletePopup = false;

    let ownerId;
    let installerId;
    let expected_throughput;
    let serial_number;
    let converter_name;
    let converter_id;

    let error;
    let message;
    let selectedId;

    let data = {
        owner_id: "",
        installer_id: "",
        expected_throughput: "",
        serial_number:"",
    }

    function isEdit(converterId: number): void {
        selectedId = converterId;
        showEditPopup = true;
    }

    const updateConverter = async () => {
        type Data = {
            owner_id: string;
            installer_id: string;
            expected_throughput: string;
            serial_number:string;
            converter_name:string;
        };

        const fieldsToUpdate: Array<keyof Data> = ['owner_id', 'installer_id', 'expected_throughput', "serial_number", "converter_name"];
        const dataToUpdate: Partial<Data> = {};

        fieldsToUpdate.forEach((field) => {
            if (data[field] && data[field] !== '') {
                dataToUpdate[field] = data[field];
            }
        });


        if (validateConverterUpdate(dataToUpdate)) {
            await editConverter(dataToUpdate, selectedId);
            showEditPopup = false;
            await loadSelectedData();
        }
    }

    function deleteConverter(converterId: number): void {
        selectedId = converterId;
        showDeletePopup = true;
    }

    const execute = async () => {
        await removeConverter(selectedId);
        showDeletePopup = false;
        await loadSelectedData()
        converter_name:""
    }

    function handleAdd() {
        if (isValidConverter(ownerId, installerId,expected_throughput,serial_number,converter_name,converter_id)) {
            error = undefined;
            message = undefined;

            addConverter(ownerId, installerId,expected_throughput,serial_number,converter_name,converter_id).then((response) => {
                if (response.error !== undefined) {
                    error = response.error
                } else {
                    message = "Converter added!"
                    showAddPopup = false;
                    loadSelectedData()
                }
            })
        }
    }

    $: rows = new Array($apiData.length);

    let buttons = [-2, -1, 0, 1, 2];
    let pageCount = 0;

    $: filteredRows = rows;
    $: visibleRows = filteredRows.slice(pageIndex, pageIndex + pageSize);

    setContext("state", {
        getState: () => ({
            page,
            pageIndex,
            pageSize,
            rows,
            filteredRows
        }),
        setPage: (_page, _pageIndex) => {
            page = _page;
            pageIndex = _pageIndex;
        },
        setRows: _rows => (filteredRows = _rows)
    });

    function onPageChange(event) {
        dispatch("pageChange", event.detail);
    }

    function onSearch(event) {
        dispatch("search", event.detail);
    }

    let isClient;
    if (localStorage.getItem('role') === "Client") {
        isClient = 'pt-5';
    } else {
        isClient = '';
    }

</script>


<body>

<div class="container">
    <Modal open={showDeletePopup} on:click={ () => showAddPopup = false}>
        <form>
            <div class="modal-header">
                <h5 class="modal-title" id="sampleModalLabel">Delete</h5>
                <button type="button" class="bi bi-x-circle" data-dismiss="modal" aria-label="Close"
                        on:click={() => showDeletePopup = false}>
                </button>
            </div>
            <i class="bi bi-x-circle d-flex justify-content-center" style="font-size: 5rem; color: red"></i>
            <br>
            <h3 class="d-flex justify-content-center">Are you sure?</h3>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        on:click={() => showDeletePopup = false}>Close
                </button>
                <button type="button" class="btn btn-danger" on:click={() =>execute()}>Delete</button>
            </div>
        </form>
    </Modal>
</div>

<div class="container">
    <Modal open={showAddPopup} on:click={ () => showEditPopup = false}>
        <form>
            <div class="modal-header">
                <h5 class="modal-title">Add</h5>
                <button type="button" class="bi bi-x-circle" data-dismiss="modal"
                        on:click={ () => showAddPopup = false}>
                </button>
            </div>

            <div class="modal-body">
                <div class="form-group">
                    <label>Converter Name</label>
                    <input type="text" class="form-control" bind:value={converter_name} required/>
                </div>
                <div class="form-group">
                    <label>Converter ID</label>
                    <input type="number" class="form-control" bind:value={converter_id} required/>
                </div>
                <div class="form-group">
                    <label>Owner ID</label>
                    <input type="number" class="form-control" bind:value={ownerId} required>
                </div>
                <div class="form-group">
                    <label>Installer ID</label>
                    <input type="number" class="form-control" bind:value={installerId} required/>
                </div>
                <div class="form-group">
                    <label>Serial Number</label>
                    <input type="text" class="form-control" bind:value={serial_number} required/>
                </div>

                <div class="form-group">
                    <label>Expected Throughput</label>
                    <input type="number" class="form-control" bind:value={expected_throughput} required/>
                </div>

                {#if error}<p>{error}</p> {/if}
                {#if message}<p>{message}</p>{/if}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        on:click={ () => showAddPopup = false}>Close
                </button>
                <button type="button" class="btn btn-success" on:click={() => handleAdd()}>Add</button>
            </div>

        </form>
    </Modal>
</div>
<div class="container">
    <Modal open={showEditPopup} on:click={() => showEditPopup = false}>
        <form>
            <div class="modal-header">
                <h5 class="modal-title">Edit</h5>
                <button type="button" class="bi bi-x-circle" data-dismiss="modal"
                        on:click={ () => showEditPopup = false}>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Converter_Name</label>
                    <input bind:value={data.converter_name} type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Owner ID</label>
                    <input bind:value={data.owner_id} type="number" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Installer ID</label>
                    <input bind:value={data.installer_id} type="number" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Expected Throughput</label>
                    <input bind:value={data.expected_throughput} type="number" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Serial Number</label>
                    <input bind:value={data.serial_number} type="text" class="form-control" required>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        on:click={ () => showEditPopup = false}>Close
                </button>
                <button type="button" class="btn btn-primary" on:click={() => updateConverter()}>Save changes</button>
            </div>
        </form>
    </Modal>
</div>

<div class="container">
    <div class="table-wrapper {isClient}">
        {#if localStorage.getItem('role') !== "Client"}
            <div class="col-md-6">
                <button class=" btn btn-success" type="button" on:click={ () => showAddPopup = true}>Add a new converter</button>
            </div>
        {/if}
        <table class="table table-hover">
            <thead class="table-dark">
                <tr>
                    <th scope="col">Converter_id</th>
                    <th scope="col">Converter Name</th>
                    <th scope="col">Expected throughput</th>
                    <th scope="col">Actual throughput</th>
                    <th scope="col">Converter Status</th>

                </tr>
            </thead>

            <tbody>
            {#each $apiData as Converter, index}
                {#if page * pageSize <= index && index < (page + 1) * pageSize}
                <tr>
                    <th scope="row">{Converter.converter_id}</th>
                    <td>{Converter.converter_name}</td>
                    <td>{Converter.expected_throughput}</td>
                    <td>{Converter.throughput}</td>
                    <td>{Converter.status}</td>
                    {#if localStorage.getItem('role') === 'GlobalAdmin'}
                    <td>
                        <button class="bi bi-trash3-fill ; btn btn-danger" type="button"
                                on:click={() => deleteConverter(Converter.converter_id)}></button>
                        <button class="bi bi-pencil-square ; btn btn-primary" type="button"
                                on:click={() =>isEdit(Converter.converter_id)}></button>
                    </td>
                    {/if}
                </tr>
                {/if}
            {/each}
            </tbody>
        </table>
    </div>
    
    <slot name="bottom">
        <div class="slot-bottom">
            <svelte:component
                    this={Pagination}
                    {page}
                    {pageSize}
                    {serverSide}
                    count={filteredRows.length - 1}
                    on:pageChange={onPageChange} />
        </div>
    </slot>

    </div>
</body>

<style>

    body{
        background: url("../lib/Image 2.svg") no-repeat fixed center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        overflow-y: hidden;
    }
    body {
        height: 100vh;
    }
    table {
        color: azure;
    }

</style>
