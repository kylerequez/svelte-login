<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<ol>
    {#each data.users as user}
        <li>{user.name} - {user.email}</li>
    {/each}
</ol>   