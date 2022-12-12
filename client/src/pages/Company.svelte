<script>
    import NavigationBar from "../components/NavigationBar.svelte";
    import AddModal from "../components/AddModal.svelte"
    import EditModal from "../components/EditModal.svelte";
    import DeleteModal from "../components/DeleteModal.svelte";
    import {Pagination, PaginationItem, PaginationLink} from "sveltestrap";

    let showEditPopup = false;
    let showAddPopup = false;
    let showDeletePopup = false;

    const onAddPopup = (ev) => {
        showAddPopup = true
    }
    const onShowPopup = (ev) => {
        showEditPopup = true;
    }
    const onDeletePopup = (ev) => {
        showDeletePopup = true;
    }

    const onAddClose = (data) => {
        showAddPopup = false;
        console.log(data);
    }
    const onPopupClose = (data) => {
        showEditPopup = false;
        console.log(data);
    }
    const onDeleteClose = (data) => {
        showEditPopup = false;
        console.log(data);
    }
</script>
<NavigationBar/>
<body>

<div class="container">
    <DeleteModal open={showDeletePopup} onClosed={(data) => onDeleteClose(data)}>
            <i class="bi bi-x-circle d-flex justify-content-center" style="font-size: 5rem; color: red"></i>
            <br>
            <h3 class="d-flex justify-content-center">Are you sure?</h3>
    </DeleteModal>
</div>

<div class="container">
    <AddModal open={showAddPopup} onClosed={(data) => onAddClose(data)}>
        <form>
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
        </form>
    </AddModal>
</div>


<div class="container">
    <EditModal open={showEditPopup} onClosed={(data) => onPopupClose(data)}>
        <form>
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
    </form>
    </EditModal>
</div>

    <div class="container">
        <div class="table-wrapper">
            <div class="col-md-6">
                <button class=" btn btn-success" type="button"  on:click={onAddPopup}>Add new a company</button>
            </div>
        <table class="table table-hover ; table table-striped" >
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">####</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>company</td>
                <td>something</td>
                <td>
                    <button class="bi bi-trash3-fill ; btn btn-danger" type="button" on:click={onDeletePopup}></button>
                    <i class="bi bi-pencil-square ; btn btn-primary"></i>
                </td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>company</td>
                <td>something</td>
                <td>
                    <button class="bi bi-trash3-fill ; btn btn-danger" type="button" on:click={onDeletePopup}></button>
                    <i class="bi bi-pencil-square ; btn btn-primary"></i>
                </td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>company</td>
                <td>something</td>
                <td>
                    <button class="bi bi-trash3-fill ; btn btn-danger" type="button" on:click={onDeletePopup}></button>
                    <button class="bi bi-pencil-square ; btn btn-primary" type="button" on:click={onShowPopup}></button>
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