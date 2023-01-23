<script>
    import jwt_decode from "jwt-decode";

    export let params;
    import {onMount} from "svelte";
    import Modal from "../Components/Modal.svelte";
    import {apiData} from "../stores/store.ts";
    import Pagination from "../components/Pagination.svelte";
    import {loadSelectConvertersLogs} from "../scripts/converterLogScript";
    import { createEventDispatcher, setContext } from "svelte";
    const dispatch = createEventDispatcher();


    let loading = false;
    let page = 0;
    let pageIndex = 0;
    let pageSize = 10;
    let responsive = true;
    let rows = [];
    let serverSide = false;


    onMount(() => {
        loadSelectConvertersLogs(localStorage.getItem('converterId'))
    })

    // $apiData.forEach(function(log) {
    //     let row = [log.log_id, log.log_event, log.created_at];
    //     rows.push(row);
    // });

    rows = new Array($apiData.length);

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
    <div class="p-4 my-4 rounded- container">

        <!-- Page Header -->
        <nav class="navbar">
            <a class="navbar-brand" href="#">Converter logs</a>
        </nav>

        <!-- Table of logs -->
        <table style="text-align: left" class="table table-hover" id="table__tickets">
            <thead class= "table-dark">
                <tr>
                    <th style="width: 100px" scope="col">#id</th>
                    <th style="width: 550px" scope="col">Event</th>
                    <th style="width: 200px" scope="col">Date</th>
                </tr>
            </thead>

            <tbody>

            {#each $apiData as Log, index}
                {#if page * pageSize <= index && index < (page + 1) * pageSize}
                    <tr>
                        <th scope="row">{Log.log_id}</th>
                        <td>{Log.log_event}</td>
                        <td>{Log.created_at}</td>
<!--                        <td>-->
<!--                            <button  type="button"  class="bi bi-card-text btn-outline-dark"-->
<!--                                     data-bs-toggle="popover" data-bs-placement="left"-->

<!--                                     title="Popover title" data-bs-content="Popover on left."-->
<!--                            ></button>-->
<!--                            <div class="accordion" id="accordionExample">&ndash;&gt;-->
<!--                                <div class="accordion-item">-->
<!--                                    <h2 class="accordion-header" id="headingOne">-->
<!--                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} aria-expanded="false" aria-controls={"collapse" + index}>-->
<!--                                            Event {index}-->
<!--                                        </button>-->
<!--                                    </h2>-->
<!--                                    <div id={"collapse" + index} class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">-->
<!--                                        <div class="accordion-body">-->
<!--                                            {Log[1]}-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </td>-->
<!--                        <td>{index}</td>-->
                    </tr>
                {/if}
            {/each}

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

</body>


<style>

    /*.navbar-brand{*/
    /*    color: white;*/
    /*}*/

    /*body, div {*/
    /*    background: url("../lib/Image 2.svg") no-repeat fixed center;*/
    /*    -webkit-background-size: cover;*/
    /*    -moz-background-size: cover;*/
    /*    -o-background-size: cover;*/
    /*    background-size: cover;*/
    /*    overflow-x: hidden;*/
    /*}*/

    /*main{*/
    /*    top: 50px;*/
    /*    left: 150px;*/
    /*    position: absolute;*/
    /*}*/

    /*table{*/
    /*    color: azure;*/
    /*}*/

</style>