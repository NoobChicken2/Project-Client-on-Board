<script>
    export let params;
    import {onMount} from "svelte";
    import {loadConverters,addConverter,removeConverter} from "../scripts/converterScript";
    import NavigationBar from "../Components/NavigationBar.svelte";
    import Modal from "../Components/Modal.svelte";
    import {Pagination, PaginationItem, PaginationLink} from "sveltestrap";
    let url = `http://localhost:3000/converters/owner/${params.id}`
     async function getConverterByOwnerId(){
         const response = await fetch(url,{
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
             }
         })
         const json = await response.json();
         console.log(json)
         return json;
     }
    onMount(loadConverters)
    let showEditPopup = false;
    let showAddPopup = false;
    let showDeletePopup = false;

    let ownerId;
    let installerId;
    let expected_throughput;

    let error;
    let message;
    let deleteId;

    const editConverter = () => {

    }
    function deleteConverter(converter_id){
        deleteId = converter_id;
        showDeletePopup = true;
    }
    const execute = async () => {
        await removeConverter(deleteId);
        showDeletePopup = false;
        await loadConverters();
    }

    function handleAdd(){
        error = undefined;
        message = undefined;
        addConverter(ownerId,installerId,expected_throughput).then((response) => {
            if (response.error !== undefined){
                error = response.error
            } else {
                message = "Converter added!"
                showAddPopup = false;
                loadConverters()
            }
        })
    }



</script>
<NavigationBar/>

<body>

<div class="container">
    <Modal open={showDeletePopup} on:click={ () => showAddPopup = false}>
        <form>
            <div class="modal-header">
                <h5 class="modal-title" id="sampleModalLabel">Delete</h5>
                <button type="button" class="bi bi-x-circle" data-dismiss="modal" aria-label="Close" on:click={() => showDeletePopup = false}>
                </button>
            </div>
            <i class="bi bi-x-circle d-flex justify-content-center" style="font-size: 5rem; color: red"></i>
            <br>
            <h3 class="d-flex justify-content-center">Are you sure?</h3>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={() => showDeletePopup = false}>Close</button>
                <button type="button" class="btn btn-danger" on:click={() =>execute()}>Delete</button>
            </div>
        </form>
    </Modal>
</div>

<div class="container">
    <Modal open={showAddPopup} on:click={ () => showEditPopup = false}>
        <form>
            <div class="modal-header">
                <h5 class="modal-title" >Add</h5>
                <button type="button" class="bi bi-x-circle" data-dismiss="modal" on:click={ () => showAddPopup = false}>
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
                <button type="button" class="btn btn-secondary" data-dismiss="modal"  on:click={ () => showAddPopup = false}>Close</button>
                <button type="button" class="btn btn-success" on:click={() => handleAdd()}>Add</button>
            </div>

        </form>
    </Modal>
</div>


<div class="container">
    <Modal open={showEditPopup} on:click={() => showEditPopup = false}>
        <form>
            <div class="modal-header">
                <h5 class="modal-title" >Edit</h5>
                <button type="button" class="bi bi-x-circle" data-dismiss="modal" on:click={ () => showEditPopup = false}>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>###</label>
                    <input type="email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>###</label>
                    <input type="text" class="form-control" required/>
                </div>
                <div class="form-group">
                    <label>###</label>
                    <input type="text" class="form-control" required>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"  on:click={ () => showEditPopup = false}>Close</button>
                <button type="button" class="btn btn-primary" on:click={() => editConverter()}>Save changes</button>
            </div>
        </form>
    </Modal>
</div>

<div class="container">
    <div class="table-wrapper">
        <div class="col-md-6">
            <button class=" btn btn-success" type="button"  on:click={ () => showAddPopup = true}>Add a new converter</button>
        </div>
        <table class="table table-hover ; table table-striped" >
            <thead>
            <tr>
                <th scope="col">Converter_id</th>
                <th scope="col">Owner_id</th>
                <th scope="col">Installer_id</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#await getConverterByOwnerId()}
                {:then converters}
                {#each converters as Converter}
                    <tr>
                        <th scope="row">{Converter.converter_id}</th>
                        <td>{Converter.owner_id}</td>
                        <td>{Converter.installer_id}</td>
                        <td>{Converter.expected_throughput}</td>
                        <td>
                            <button class="bi bi-trash3-fill ; btn btn-danger" type="button"  on:click={deleteConverter(Converter.converter_id) } ></button>
                            <i class="bi bi-pencil-square ; btn btn-primary"></i>
                        </td>
                    </tr>
                {/each}
            {/await}
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

        <Pagination ariaLabel="Page navigation example">
            <PaginationItem disabled>
                <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem disabled>
                <PaginationLink previous href="#" />
            </PaginationItem>
            <PaginationItem active>
                <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#" />
            </PaginationItem>
        </Pagination>
    </div>
</div>


</body>

<style>

</style>
