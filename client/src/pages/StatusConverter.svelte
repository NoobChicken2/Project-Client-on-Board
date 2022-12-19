<script>
    import ConverterList from "../Components/ConverterList.svelte";
    import NavigationBar from "../Components/NavigationBar.svelte";
    import Modal from "../Components/Modal.svelte";
    import {Pagination, PaginationItem, PaginationLink} from "sveltestrap";

    let showEditPopup = false;
    let showAddPopup = false;
    let showDeletePopup = false;

    const editConverter = () => {

    }
    const deleteConverter = () => {

    }
    const addConverter = () => {

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
                <button type="button" class="btn btn-danger" on:click={() =>deleteConverter()
                }>Delete</button>
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
                <button type="button" class="btn btn-secondary" data-dismiss="modal"  on:click={ () => showAddPopup = false}>Close</button>
                <button type="button" class="btn btn-success" on:click={() => addConverter()}>Add</button>
            </div>
        </form>
    </Modal>
</div>


<div class="container">
    <Modal open={showEditPopup} on:click={ () => showEditPopup = false}>
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
            <button class=" btn btn-success" type="button"   on:click={ () => showAddPopup = true}>Add a new converter</button>
        </div>
        <table class="table table-hover ; table table-striped" >
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Converter</td>
                <td>Working</td>
                <td>
                    <button class="bi bi-trash3-fill ; btn btn-danger" type="button"  on:click={ () => showDeletePopup = true}></button>
                    <i class="bi bi-pencil-square ; btn btn-primary"></i>
                </td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Converter</td>
                <td>Working</td>
                <td>
                    <button class="bi bi-trash3-fill ; btn btn-danger" type="button"  on:click={ () => showDeletePopup = true}></button>
                    <i class="bi bi-pencil-square ; btn btn-primary"></i>
                </td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Converter</td>
                <td>Working</td>
                <td>
                    <button class="bi bi-trash3-fill ; btn btn-danger" type="button"  on:click={ () => showDeletePopup = true}></button>
                    <button class="bi bi-pencil-square ; btn btn-primary" type="button"  on:click={ () => showEditPopup = true}></button>
                </td>
            </tr>
            </tbody>
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

