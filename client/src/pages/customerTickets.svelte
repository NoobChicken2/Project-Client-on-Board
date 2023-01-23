<script>
import {apiData} from "../stores/store";
import {createEventDispatcher, onMount, setContext} from "svelte";
import {loadConverters} from "../scripts/converterScript";
import Pagination from "../components/Pagination.svelte";

const dispatch = createEventDispatcher();

let loading = false;
let page = 0;
let pageIndex = 0;
let pageSize = 10;
let responsive = true;
let rows = [];
let serverSide = false;

onMount(loadConverters)

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
<div class="container">
    <div class="table-wrapper">
        <div class="col-md-6">
        </div>
        <table class="table table-hover ; table table-striped">
            <thead>
            <tr>
                <th scope="col">Converter_id</th>
                <th scope="col">Owner_id</th>
                <th scope="col">Installer_id</th>
                <th scope="col">Throughput</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each $apiData as Converter, index}
                {#if page * pageSize <= index && index < (page + 1) * pageSize}
                <tr>
                    <th scope="row">{Converter.converter_id}</th>
                    <td>{Converter.owner_id}</td>
                    <td>{Converter.installer_id}</td>
                    <td>{Converter.expected_throughput}</td>
                    <td>

                    </td>
                </tr>
                {/if}
            {/each}
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