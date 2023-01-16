<script>
import {apiData} from "../stores/store";
import {onMount} from "svelte";
import {loadConverters} from "../scripts/converterScript";

onMount(loadConverters)
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
            {#each $apiData as Converter}
                <tr>
                    <th scope="row">{Converter.converter_id}</th>
                    <td>{Converter.owner_id}</td>
                    <td>{Converter.installer_id}</td>
                    <td>{Converter.expected_throughput}</td>
                    <td>

                    </td>
                </tr>
            {/each}
        </table>

    </div>
</div>
</body>