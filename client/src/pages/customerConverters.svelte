<script>
    import {apiData} from "../stores/store.ts";
    import {onMount} from "svelte";
    import {getConverterByOwnerId} from "../scripts/converterScript.ts";


</script>

<body>
    {#each $apiData as Converter}
        <tr>
            <th scope="row">{Converter.converter_id}</th>
            <td>{Converter.owner_id}</td>
            <td>{Converter.installer_id}</td>
            <td>{Converter.expected_throughput}</td>
            <td>
                <i class="bi bi-pencil-square ; btn btn-primary"></i>
            </td>
        </tr>
    {/each}
</body>