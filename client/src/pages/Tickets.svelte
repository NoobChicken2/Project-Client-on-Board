<script>
    import NavigationBar from "../components/NavigationBar.svelte";

    const myInput = document.getElementById('myInput');

</script>

<NavigationBar/>

<body>
    <div class="p-5 my-4 bg-light rounded-3 container">

        <!-- Page Header -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Tickets List</a>
        </nav>

        <!-- Table of tickets -->
        <table style="text-align: left" class="table table-hover" id="table__tickets">
            <thead class= "table-dark">
                <tr>
                    <th style="width: 50px" scope="col"></th>
                    <th style="width: 100px" scope="col">#id</th>
                    <th style="width: 300px" scope="col">Title</th>
                    <th style="width: 150px" scope="col">CustomerID</th>
                    <th style="width: 200px" scope="col">Date</th>
                    <th style="width: 50px" scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    </td>
                    <th scope="row">1</th>
                    <td>Ticket One</td>
                    <td>2</td>
                    <td>12-14-2022</td>
                    <button type="button" class="bi bi-card-text btn-outline-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
                </tr>
                <tr>
                    <td>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    </td>
                    <th scope="row">2</th>
                    <td>Ticket Two</td>
                    <td>3</td>
                    <td>10-14-2022</td>
                    <button type="button" class="bi bi-card-text btn-outline-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
                </tr>
                <tr>
                    <td>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    </td>
                    <th scope="row">3</th>
                    <td>Ticket Three</td>
                    <td>1</td>
                    <td>06-14-2022</td>
                    <button type="button" class="bi bi-card-text btn-outline-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
                </tr>
            </tbody>
        </table>

        <!-- TEST TICKET BUTTON -->
        <button type="button" class="btn-outline-dark" data-bs-toggle="popover" data-bs-title="Ticket Title" data-bs-content="Ticket content (description, status, priority)">
            <i class = ""></i>
        </button>

    </div>
</body>

<style>
    main{
        top: 50px;
        left: 150px;
        position: absolute;
    }
</style>