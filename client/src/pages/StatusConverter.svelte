<script lang="ts">
    import {onMount} from "svelte";
    import {
        loadConverters,
        addConverter,
        removeConverter,
        editConverter,
        isValidConverter, validateConverterUpdate
    } from "../scripts/converterScript";
    import NavigationBar from "../Components/NavigationBar.svelte";
    import Modal from "../Components/Modal.svelte";
    import {Pagination, PaginationItem, PaginationLink} from "sveltestrap";
    import {apiData} from "../stores/store.ts";

    onMount(loadConverters)

    let showEditPopup = false;
    let showAddPopup = false;
    let showDeletePopup = false;

    let ownerId;
    let installerId;
    let expected_throughput;

    let error;
    let message;
    let selectedId;

    let data = {
        owner_id: "",
        installer_id: "",
        expected_throughput: ""
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
        };

        const fieldsToUpdate: Array<keyof Data> = ['owner_id', 'installer_id', 'expected_throughput'];
        const dataToUpdate: Partial<Data> = {};

        fieldsToUpdate.forEach((field) => {
            if (data[field] && data[field] !== '') {
                dataToUpdate[field] = data[field];
            }
        });

        console.log(dataToUpdate)
        console.log(selectedId)
        if (validateConverterUpdate(dataToUpdate)) {
            await editConverter(dataToUpdate, selectedId);
            showEditPopup = false;
            await loadConverters();
        }
    }

    function deleteConverter(converterId: number): void {
        selectedId = converterId;
        showDeletePopup = true;
    }

    const execute = async () => {
        await removeConverter(selectedId);
        showDeletePopup = false;
        await loadConverters();
    }

    function handleAdd() {
        if (isValidConverter(ownerId, installerId, expected_throughput)) {
            error = undefined;
            message = undefined;

            addConverter(ownerId, installerId, expected_throughput).then((response) => {
                if (response.error !== undefined) {
                    error = response.error
                } else {
                    message = "Converter added!"
                    showAddPopup = false;
                    loadConverters()
                }
            })
        }
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
                    <label>Owner ID</label>
                    <input bind:value={data.owner_id} type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Installer ID</label>
                    <input bind:value={data.installer_id} type="email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Throughput</label>
                    <input bind:value={data.expected_throughput} type="text" class="form-control" required/>
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
    <div class="table-wrapper">
        <div class="col-md-6">
            <button class=" btn btn-success" type="button" on:click={ () => showAddPopup = true}>Add a new converter
            </button>
        </div>
        <table class="table table-hover ; table table-striped">
            <thead>
            <tr>
                <th scope="col">Converter_id</th>
                <th scope="col">Owner_id</th>
                <th scope="col">Installer_id</th>
                <th scope="col">Throughput</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each $apiData as Converter}
                <tr>
                    <th scope="row">{Converter.converter_id}</th>
                    <td>{Converter.owner_id}</td>
                    <td>{Converter.installer_id}</td>
                    <td>{Converter.expected_throughput}</td>
                    <td>
                        <button class="bi bi-trash3-fill ; btn btn-danger" type="button"
                                on:click={() => deleteConverter(Converter.converter_id)}></button>
                        <button class="bi bi-pencil-square ; btn btn-primary" type="button"
                                on:click={() =>isEdit(Converter.converter_id)}></button>
                    </td>
                </tr>
            {/each}
        </table>

    </div>
</div>


</body>

<style>

</style>
