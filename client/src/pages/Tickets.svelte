<script>
    import {afterUpdate, createEventDispatcher, onMount, setContext} from "svelte";
    import {loadTickets, checkingValidTicket, addTicket} from "../scripts/ticketScript.ts";
    import {apiData} from "../stores/store.ts";
    import Pagination from "../components/Pagination.svelte";
    import Modal from "../Components/Modal.svelte";

    const dispatch = createEventDispatcher();

    let loading = false;
    let page = 0;
    let pageIndex = 0;
    let pageSize = 10;
    let responsive = true;
    let rows = [];
    let serverSide = false;
    let showAddPopup = false;
    let showEditPopup = false;
    let error;
    let message;

    let issue;
    let converter_id;
    onMount(loadTickets);


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


    function handleAdd() {
        if (checkingValidTicket(converter_id)) {
            addTicket(issue, converter_id)
            showAddPopup = false;
        }else {

        }
        loadTickets();
    }
</script>

<body>
<div class="container">
    <Modal  open={showAddPopup} on:click={ () => showEditPopup = false} >
        <form>
            <div class="modal-header">
                <h5 class="modal-title">Add</h5>
                <button type="button" class="bi bi-x-circle" data-dismiss="modal"
                        on:click={ () => showAddPopup = false}>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Issue</label>
                    <input type="text" class="form-control" bind:value={issue} required>
                </div>
                <div class="form-group">
                    <label>Converter ID</label>
                    <input type="number" class="form-control" bind:value={converter_id} required>
                </div>
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
        <div class="p-4 my-4 bg-light rounded- container">
                <button class=" btn btn-success" type="button" on:click={ () => showAddPopup = true}>Add new a ticket
                </button>
            <!-- Table of tickets -->
            <table style="text-align: left" class="table table-hover" id="table__tickets">
                <thead class= "table-dark">
                <tr>
                    <th style="width: 100px" scope="col">Converter ID</th>
                    <th style="width: 100px" scope="col">Ticket ID</th>
                    <th style="width: 300px" scope="col">Issue</th>
                    <th style="width: 150px" scope="col">LogID</th>
                    <th style="width: 200px" scope="col">Date</th>
                    <th style="width: 50px" scope="col"></th>
                </tr>
                </thead>
                <tbody>

                {#each $apiData as Ticket, index}
                    {#if page * pageSize <= index && index < (page + 1) * pageSize}
                        <tr>
                            <th>{Ticket.converter_id}</th>
                            <th scope="row">{Ticket.ticket_id}</th>
                            <td>{Ticket.log_event}</td>
                            <td>{Ticket.log_id}</td>
                            <td>{Ticket.created_at}</td>
                        </tr>
                    {/if}
                {/each}
                </tbody>
            </table>

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
    table, div,body {
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