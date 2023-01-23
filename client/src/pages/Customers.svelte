<script lang="ts">
    import Modal from "../components/Modal.svelte";
    import {onMount} from "svelte";
    import {apiData} from "../stores/store.ts";
    import {
        addCustomer,
        isValidCustomer,
        loadCustomers, loadSelectCustomers,
        patchCustomer,
        removeCustomer, validateCustomerUpdate
    } from "../scripts/customerScript.ts";
    import router from "page";
    import {addCompanyAdmin} from "../scripts/companyAdminScript";

    const myInput = document.getElementById('myInput');
    let showDeletePopup = false;
    let showAddPopup = false;
    let showAddPopupAdmin = false;


    let selectedCompanyId;
    let customerId;
    let body = {};
    let showEditPopup = false;

    let adminBody={};

    onMount(() => {
        if(localStorage.getItem('role') === 'CompanyAdmin'){
            loadSelectCustomers(localStorage.getItem('company_id'))
        } else if (localStorage.getItem('role') === 'GlobalAdmin'){
            loadCustomers()
        }
    })

    function converterByOwnerId(id){
        router('/customers/'+ id + '/converters')
    }

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

    const addNewAdmin = async () => {
        const data = {};

        const fields = ['admin_company_id','admin_username', 'admin_first_name', 'admin_last_name', 'admin_email', 'admin_password', 'admin_repeat_password', 'admin_phone_number'];

        for (const field of fields) {
            data[field] = getValueById(field);
        }

        if (isValidCustomer(data)) {
            await addCompanyAdmin(data)
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
<div class="container">
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
    <Modal open={showAddPopupAdmin} on:click={ () => showDeletePopup = false}>
        <form>
            <div class="modal-header">
                <h5 class="modal-title">Add</h5>
                <button type="button" class="bi bi-x-circle" data-dismiss="modal"
                        on:click={ () => showAddPopup = false}>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>CompanyID</label>
                    <input id="admin_company_id"  type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Username</label>
                    <input id="admin_username"  type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input id="admin_password"  type="password" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Repeat Password</label>
                    <input id="admin_repeat_password" type="password" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>First Name</label>
                    <input id="admin_first_name" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input id="admin_last_name" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input id="admin_email" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input id="admin_phone_number" type="text" class="form-control" required>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        on:click={ () => showAddPopupAdmin = false}>Close
                </button>
                <button type="button" class="btn btn-success"
                        on:click={() => addNewAdmin() }>Add
                </button>
            </div>
        </form>
    </Modal>



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
    <div class="container">
        <div class="table-wrapper">
            <div class="col-md-6">
                <button class=" btn btn-success" type="button" on:click={ () => showAddPopup = true}>Add new a customer
                </button>
                {#if localStorage.getItem('role') === 'GlobalAdmin'}
                    <button class=" btn btn-success" type="button" on:click={ () => showAddPopupAdmin = true}>Add new a CompanyAdmin
                    </button>
                {/if}

            </div>
            <!-- Table of customers -->
            <table class="table table-hover">
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
                            <button class="bi bi-motherboard ; btn btn-secondary"
                                    on:click|preventDefault={converterByOwnerId(Customer.user_id)}></button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </div>
    <!-- Modal -->
    <div class="container">
    <Modal open="{showEditPopup}" class="modal fade" id="staticBackdrop add-model" data-bs-backdrop="static"
           data-bs-keyboard="false"
           tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <form>
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Customer</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body col-md">


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
                                <input type="email" class="form-control" bind:value={body.phone_number} id="modal-number"
                                       placeholder="e.g.@example.com">
                            </div>
                            <div class="invalid-feedback">Please enter a phone number</div>
                        </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" on:click={ () => showEditPopup = false}>Close</button>
                    <button type="button" class="btn btn-primary" on:click={ () => handleEdit()}>Finish</button>
                </div>
        </form>
    </Modal></div>
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