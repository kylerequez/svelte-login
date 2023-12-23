/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        info: {
            title: "Server Page",
            description: "This is a server page that loads data before it can be rendered"
        }
    }
}  