<script>
    import {apiData} from "../stores/store.ts";

    export let params;
    import {createEventDispatcher, onMount, setContext} from "svelte";
    import {
        loadClientConverters,
        addConverter,
        removeConverter,
        editConverter, loadConvertersGlobal
    } from "../scripts/converterScript";
    import Modal from "../Components/Modal.svelte";
    import router from "page";
    import Pagination from "../components/Pagination.svelte";

    const dispatch = createEventDispatcher();
    let role = localStorage.getItem('role');
    let url = document.URL;
    let customerId = url.split("/")
    let loading = false;
    let page = 0;
    let pageIndex = 0;
    let pageSize = 10;
    let responsive = true;
    let rows = [];
    let serverSide = false;

    onMount(() => {
        loadClientConverters(customerId[4]);
    });

    let showEditPopup = false;
    let showAddPopup = false;
    let showDeletePopup = false;

    let ownerId;
    let installerId;
    let expected_throughput;
    let converterId;
    let body = {};
    let error;
    let message;
    let deleteId;

    const isEditConverter = (id) => {
        converterId = id;
        showEditPopup = true;
    }
    const handleEdit = async () => {

       await editConverter(body, converterId)
        showEditPopup = false;
       await loadClientConverters(customerId[4])
    }


    function deleteConverter(converter_id) {
        deleteId = converter_id;
        showDeletePopup = true;
    }

    const execute = async () => {
        await removeConverter(deleteId);
        showDeletePopup = false;
        await loadConvertersGlobal();
    }

    function handleAdd() {
        error = undefined;
        message = undefined;
        addConverter(ownerId, installerId).then((response) => {
            if (response.error !== undefined) {
                error = response.error
            } else {
                message = "Converter added!"
                showAddPopup = false;
                loadConvertersGlobal()
            }
        })
    }

        window.onload = () => {
            let myAlert = document.querySelector('.toast')
            let bsAlert = new bootstrap.Toast(myAlert)
            bsAlert.show()
        }

    function converterLogs(id) {
        router('/converters/' + id + '/logs');
        localStorage.setItem("converterId", id);
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


</script>

<div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
    <div role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-bs-autohide="false">
         <div class="toast-header">
        <i class="bi bi-exclamation-triangle d-flex" style="font-size: 2rem; color: red"></i>
        <strong class="me-auto">Alert</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
         </div>
        <div class="toast-body">
        we can put here a way to solve the alert
        </div>
    </div>
</div>
<body>

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
                    <label>Owner ID</label>
                    <input type="number" class="form-control" bind:value={ownerId} required>
                </div>
                <div class="form-group">
                    <label>Installer ID</label>
                    <input type="number" class="form-control" bind:value={installerId} required/>
                </div>
                <div class="form-group">
                    <label>Expected Throughput</label>
                    <input type="number" class="form-control" bind:value={expected_throughput} required>
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
                    <label>Name</label>
                    <input bind:value={body.converter_name} type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Serial Number</label>
                    <input bind:value={body.serial_number} type="email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Expected Throughput</label>
                    <input bind:value={body.expected_throughput} type="text" class="form-control" required/>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        on:click={ () => showEditPopup = false}>Close
                </button>
                <button type="button" class="btn btn-primary" on:click={() => handleEdit()}>Save changes</button>
            </div>
        </form>
    </Modal>
</div>

<div class="container">
    <div class="table-wrapper">
        <div class="col-md-6">
            {#if role !== "Client"}
                <button class=" btn btn-success" type="button" on:click={ () => showAddPopup = true}>Add a new converter</button>
            {/if}
        </div>
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col">Converter_id</th>
                <th scope="col">Converter Name</th>
                <th scope="col">Status</th>
                <th scope="col">Expected Throughput</th>
                <th scope="col">Serial Number</th>
            </tr>
            </thead>
            <tbody>


                {#each $apiData as Converter, index}
                    {#if page * pageSize <= index && index < (page + 1) * pageSize}
                    <tr>
                        <th scope="row">{Converter.converter_id}</th>
                        <td>{Converter.converter_name}</td>
                        <td>{Converter.status}</td>
                        <td>{Converter.expected_throughput}</td>
                        <td>{Converter.serial_number}</td>
                        <td>
                            <button class="bi bi-trash3-fill ; btn btn-danger" type="button"
                                    on:click={() => deleteConverter(Converter.converter_id) }></button>
                            <button class="bi bi-pencil-square ; btn btn-primary"
                            on:click={() => isEditConverter(Converter.converter_id)}>
                            </button>
                            <button class="bi bi-journal ; btn btn-secondary"
                                    on:click|preventDefault={converterLogs(Converter.converter_id)}></button>
                        </td>
                    </tr>
                    {/if}
                {/each}

            <!--            <tr>-->
            <!--                <th scope="row">2</th>-->
            <!--                <td>Converter</td>-->
            <!--                <td>Working</td>-->
            <!--                <td>-->
            <!--                    <button class="bi bi-trash3-fill ; btn btn-danger" type="button"  on:click={ () => showDeletePopup = true}></button>-->
            <!--                    <i class="bi bi-pencil-square ; btn btn-primary"></i>-->
            <!--                </td>-->
            <!--            </tr>-->
            <!--            <tr>-->
            <!--                <th scope="row">3</th>-->
            <!--                <td>Converter</td>-->
            <!--                <td>Working</td>-->
            <!--                <td>-->
            <!--                    <button class="bi bi-trash3-fill ; btn btn-danger" type="button"  on:click={ () => showDeletePopup = true}></button>-->
            <!--                    <button class="bi bi-pencil-square ; btn btn-primary" type="button"  on:click={ () => showEditPopup = true}></button>-->
            <!--                </td>-->
            <!--            </tr>-->
            <!--            </tbody>-->
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

    main {
        top: 50px;
        left: 150px;
        position: absolute;
    }
    table, body {
        background: url("../lib/Image 2.svg") no-repeat fixed center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        overflow-x: hidden;
    }
    table{
        color: azure;
    }
    body{
        height: 100vh;
    }

</style>
