<script>
    let isOpen = false;

    function togglePopover() {
        isOpen = !isOpen;
    }
</script>

{#if isOpen}
    <div class="popover" role="tooltip">
        <slot></slot>
    </div>
{/if}
