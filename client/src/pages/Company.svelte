<script>
    import Modal from "../components/Modal.svelte"
    import {Pagination} from "sveltestrap";
    import {addCompany, loadCompanies, removeCompany, editCompany, isValidCompany} from "../scripts/companyScript";
    import {createEventDispatcher, onMount, setContext} from "svelte";
    import {apiData} from "../stores/store.ts";

    const dispatch = createEventDispatcher();

    let loading = false;
    let page = 0;
    let pageIndex = 0;
    let pageSize = 10;
    let responsive = true;
    let rows = [];
    let serverSide = false;

    let showEditPopup = false;
    let showAddPopup = false;
    let showDeletePopup = false;
    let selectedCompanyId;
    let newCompanyName;
    let data = {
        company_id: "",
        company_name: "",
    }

    onMount(loadCompanies);

    let isEdit = (company) => {
        showEditPopup = true;
        data = company;
    }
    const updateCompany = async (id) => {

        if (isValidCompany(data.company_name)) {
            let dataToUpdate = {
                company_id: data.company_id,
                company_name: data.company_name
            }

            await editCompany(id, dataToUpdate)
            showEditPopup = false;
            await loadCompanies();
        }
    }

    const deleteCompany = async () => {
        await removeCompany(selectedCompanyId)
        showDeletePopup = false;
        await loadCompanies();
    }


    const addNewCompany = async (name) => {
        if (isValidCompany(name)) {
            newCompanyName = name;
            await addCompany(name)
            showAddPopup = false;
            await loadCompanies();
        }
    }

    function deleteClicked(company_id) {
        selectedCompanyId = company_id;
        showDeletePopup = true;
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


<body>
<div class="container">
    <Modal open={showDeletePopup}>
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
                <button type="button" class="btn btn-danger" on:click={() =>deleteCompany()
                }>Delete
                </button>
            </div>
        </form>
    </Modal>
</div>

<div class="container">
    <Modal open={showAddPopup}>
        <form>
            <div class="modal-header">
                <h5 class="modal-title">Add</h5>
                <button type="button" class="bi bi-x-circle" data-dismiss="modal"
                        on:click={ () => showAddPopup = false}>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Company Name</label>
                    <input id="companyName" type="text" class="form-control" required>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        on:click={ () => showAddPopup = false}>Close
                </button>
                <button type="button" class="btn btn-success"
                        on:click={() => addNewCompany(document.getElementById("companyName").value)}>Add
                </button>
            </div>
        </form>
    </Modal>
</div>


<div class="container">
    <Modal open={showEditPopup}>
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
                    <input bind:value={data.company_name} type="text" class="form-control" required>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        on:click={ () => showEditPopup = false}>Close
                </button>
                <button type="button" class="btn btn-primary" on:click={() => updateCompany(data.company_id)}>Save
                    changes
                </button>
            </div>
        </form>
    </Modal>
</div>

<div class="container">
    <div class="table-wrapper">
        <div class="col-md-6">
            <button class=" btn btn-success" type="button" on:click={ () => showAddPopup= true}>Add new a company
            </button>
        </div>
        <table class="table table-hover">
            <thead class="table-dark">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>

            {#await $apiData }}
                <p>Loading companies...</p>
            {:then companies}

                { #each $apiData as Company, index}
                    {#if page * pageSize <= index && index < (page + 1) * pageSize}
                    <tr>
                        <th scope="row">{Company.company_id}</th>
                        <td>{Company.company_name}</td>
                        <td>
                            <button class="bi bi-trash3-fill ; btn btn-danger" type="button"
                                    on:click={ () =>deleteClicked(Company.company_id)}></button>
                            <button class="bi bi-pencil-square ; btn btn-primary" type="button"
                                    on:click={ () => isEdit(Company)}></button>
                        </td>
                    </tr>
                    {/if}
                {/each}

            {/await}
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
    table{
        color: azure;
    }
    body{

        background: url("/lib/Image 2.svg") no-repeat fixed center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        overflow-x: hidden;
        height: 100vh;
    }
</style>