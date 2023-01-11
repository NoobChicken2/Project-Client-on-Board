<script lang="ts">
    import NavigationBar from "../components/NavigationBar.svelte";
    import Modal from "../components/Modal.svelte";
    import {onMount} from "svelte";
    import {apiData} from "../stores/store.ts";
    import {
        addCustomer,
        isValidCustomer,
        loadCustomers,
        patchCustomer,
        removeCustomer, validateCustomerUpdate
    } from "../scripts/customerScript.ts";

    const myInput = document.getElementById('myInput');
    let showDeletePopup = false;
    let showAddPopup = false;


    let selectedCompanyId;
    let customerId;
    let body = {};
    let showEditPopup = false;

    onMount(loadCustomers);


    function editCustomer(Id) {
        customerId = Id;
        showEditPopup = true;
    }

    const handleEdit = async () => {
        if (validateCustomerUpdate(body)) {
            await patchCustomer(customerId, body);
            showEditPopup = false;
            await loadCustomers();
        }
    }

    function getValueById(id: string): string {
        return (document.getElementById(id) as HTMLInputElement).value;
    }

    const addNewCustomer = async () => {

        const data = {};

        const fields = ['username', 'first_name', 'last_name', 'email', 'password', 'repeat_password', 'phone_number'];

        for (const field of fields) {
            data[field] = getValueById(field);
        }

        if (isValidCustomer(data)) {
            await addCustomer(data)
            showAddPopup = false;
            await loadCustomers();
        }
    }

    const deleteCustomer = async () => {
        await removeCustomer(selectedCompanyId)
        showDeletePopup = false;
        await loadCustomers();
    }

    function deleteClicked(user_id) {
        selectedCompanyId = user_id;
        showDeletePopup = true;
    }


</script>


<body>
<div class="p-5 my-4 bg-light rounded-3 container">

    <!-- Page Header -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Customer List</a>
    </nav>


    <Modal open={showAddPopup} on:click={ () => showDeletePopup = false}>
        <form>
            <div class="modal-header">
                <h5 class="modal-title">Add</h5>
                <button type="button" class="bi bi-x-circle" data-dismiss="modal"
                        on:click={ () => showAddPopup = false}>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Username</label>
                    <input id="username" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input id="password" type="password" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Repeat Password</label>
                    <input id="repeat_password" type="password" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>First Name</label>
                    <input id="first_name" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input id="last_name" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input id="email" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input id="phone_number" type="text" class="form-control" required>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        on:click={ () => showAddPopup = false}>Close
                </button>
                <button type="button" class="btn btn-success"
                        on:click={() => addNewCustomer()}>Add
                </button>
            </div>
        </form>
    </Modal>
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
                    <button type="button" class="btn btn-danger" on:click={() =>deleteCustomer()
                }>Delete
                    </button>
                </div>
            </form>
        </Modal>
    </div>
    <div class="container">
        <div class="table-wrapper">
            <div class="col-md-6">
                <button class=" btn btn-success" type="button" on:click={ () => showAddPopup= true}>Add new a customer
                </button>
            </div>
            <!-- Table of customers -->
            <table class="table table-hover; table table-striped">
                <thead class="table-dark">
                <tr>
                    <th scope="col">#id</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>

                {#each $apiData as Customer}
                    <tr>
                        <th scope="row">{Customer.user_id}</th>
                        <td>{Customer.first_name}</td>
                        <td>{Customer.last_name}</td>
                        <td>{Customer.email}</td>
                        <td>
                            <button class="bi bi-trash3-fill ; btn btn-danger" type="button"
                                    on:click={ () =>deleteClicked(Customer.user_id)}></button>
                            <button class="bi bi-pencil-square ; btn btn-primary" type="button"
                                    on:click={  () => editCustomer(Customer.user_id)}></button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </div>
    <!-- Pagination -->
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
            <li class="page-item disabled">
                <a class="page-link">Previous</a>
            </li>
            <li class="page-item active" aria-current="page">
                <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>

    <!-- Modal -->
    <Modal open="{showEditPopup}" class="modal fade" id="staticBackdrop add-model" data-bs-backdrop="static"
           data-bs-keyboard="false"
           tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Customer</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body col-md">
                    <form>

                        <div class="row mb-3">
                            <label for="modal-username" class="col-sm-3 col-form-label text-start">Username:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" bind:value={body.username} id="modal-username">
                            </div>
                            <div class="invalid-feedback">Please enter a username</div>
                        </div>
                        <div class="row mb-3">
                            <label for="modal-password" class="col-sm-3 col-form-label text-start">Password:</label>
                            <div class="col-sm-9">
                                <input type="password" class="form-control" bind:value={body.password}
                                       id="modal-password">
                            </div>
                            <div class="invalid-feedback">Please enter a password</div>
                        </div>
                        <div class="row mb-3">
                            <label for="modal-firstname" class="col-sm-3 col-form-label text-start">Firstname:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" bind:value={body.first_name}
                                       id="modal-firstname">
                            </div>
                            <div class="invalid-feedback">Please enter the firstname</div>
                        </div>
                        <div class="row mb-3">
                            <label for="modal-lastname" class="col-sm-3 col-form-label text-start">Lastname:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" bind:value={body.last_name} id="modal-lastname">
                            </div>
                            <div class="invalid-feedback">Please enter the lastname</div>
                        </div>
                        <div class="row mb-3">
                            <label for="modal-email" class="col-sm-3 col-form-label text-start">Email:</label>
                            <div class="col-sm-9">
                                <input type="email" class="form-control" bind:value={body.email} id="modal-email"
                                       placeholder="e.g.@example.com">
                            </div>
                            <div class="invalid-feedback">Please enter a email</div>
                        </div>
                        <div class="row mb-3">
                            <label for="modal-email" class="col-sm-3 col-form-label text-start">Phone number:</label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control" bind:value={body.phone_number}
                                       id="modal-number"
                                       placeholder="e.g.@example.com">
                            </div>
                            <div class="invalid-feedback">Please enter a phone number</div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            on:click={ () => showEditPopup = false}>Close
                    </button>
                    <button type="button" class="btn btn-primary" on:click={ () => handleEdit()}>Finish</button>
                </div>
            </div>
        </div>
    </Modal>
</div>
</body>


<style>

</style>