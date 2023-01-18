<script>
    export let img, cardTitle, cardText, link;
</script>

<div class="card text-center">
    <img class="card-img-top" src={img} alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">{cardTitle}</h5>
        <p class="card-text">{cardText}</p>
        <a href={link} class="stretched-link"></a>
    </div>
</div>


<style>
    .card {
        height: 230px;
        width: 230px;
    }
    .card > img {
        height: 50%;
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 1.5rem;
    }
</style>