<script>
    import NavigationBar from "../components/NavigationBar.svelte";
    import Modal from "../components/Modal.svelte";

    const myInput = document.getElementById('myInput');

</script>

<NavigationBar/>

<body>
    <div class="p-5 my-4 bg-light rounded-3 container">

        <!-- Page Header -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Customer List</a>
        </nav>

        <!-- Table of customers -->
        <table style="text-align: left" class="table table-hover" id="table__customers">
            <thead class= "table-dark">
                <tr>
                    <th style="width: 50px" scope="col"></th>
                    <th style="width: 100px" scope="col">#id</th>
                    <th style="width: 200px" scope="col">Firstname</th>
                    <th style="width: 200px" scope="col">Lastname</th>
                    <th style="width: 400px" scope="col">Email</th>
                    <th style="width: 50px" scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    </td>
                    <th scope="row">1</th>
                    <td>Andrew</td>
                    <td>Albert</td>
                    <td>Allie_Albert@example.com</td>
                    <button type="button" class="bi bi-pencil-square btn-outline-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
                </tr>
                <tr>
                    <td>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    </td>
                    <th scope="row">2</th>
                    <td>Ben</td>
                    <td>Bailey</td>
                    <td>Ben_Bright@example.com</td>
                    <button type="button" class="bi bi-pencil-square btn-outline-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
                </tr>
                <tr>
                    <td>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    </td>
                    <th scope="row">3</th>
                    <td>Chris</td>
                    <td>Collins</td>
                    <td>Larry@example.com</td>
                    <button type="button" class="bi bi-pencil-square btn-outline-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
                </tr>
            </tbody>
        </table>


        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <span class = "bi bi-person-plus"></span>
            Add new Customer
        </button>

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
        <Modal class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Register Customer</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body col-md">
                        <form>
                            <div class="row mb-3">
                                <label for="modal-role" class="col-sm-3 col-form-label text-start">Role:</label>
                                <div class="col-sm-9">
                                    <select class="form-select" id="modal-role" aria-label="Default select example">
                                        <option selected>Select a role</option>
                                        <option value="1">Customer</option>
                                        <option value="2">Company</option>
                                        <option value="3">Global Admin</option>
                                    </select>
                                </div>
                                <div class="invalid-feedback">Please choose a rol</div>
                            </div>
                            <div class="row mb-3">
                                <label for="modal-username" class="col-sm-3 col-form-label text-start">Username:</label>
                                <div class="col-sm-9">
                                    <input type="username" class="form-control" id="modal-username">
                                </div>
                                <div class="invalid-feedback">Please enter a username</div>
                            </div>
                            <div class="row mb-3">
                                <label for="modal-password" class="col-sm-3 col-form-label text-start">Password:</label>
                                <div class="col-sm-9">
                                    <input type="password" class="form-control" id="modal-password">
                                </div>
                                <div class="invalid-feedback">Please enter a password</div>
                            </div>
                            <div class="row mb-3">
                                <label for="modal-firstname" class="col-sm-3 col-form-label text-start">Firstname:</label>
                                <div class="col-sm-9">
                                    <input type="firstname" class="form-control" id="modal-firstname">
                                </div>
                                <div class="invalid-feedback">Please enter the firstname</div>
                            </div>
                            <div class="row mb-3">
                                <label for="modal-lastname" class="col-sm-3 col-form-label text-start">Lastname:</label>
                                <div class="col-sm-9">
                                    <input type="lastname" class="form-control" id="modal-lastname">
                                </div>
                                <div class="invalid-feedback">Please enter the lastname</div>
                            </div>
                            <div class="row mb-3">
                                <label for="modal-email" class="col-sm-3 col-form-label text-start">Email:</label>
                                <div class="col-sm-9">
                                    <input type="email" class="form-control" id="modal-email" placeholder="e.g.@example.com">
                                </div>
                                <div class="invalid-feedback">Please enter a email</div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Finish</button>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</body>

<style>
    main{
        top: 50px;
        left: 150px;
        position: absolute;
    }
</style>