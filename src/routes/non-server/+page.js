/** @type {import('./$types').PageLoad} */
export function load() {
    return {
        info: {
            title: "Non-Server Page",
            description: "This is a non-server page that loads data before it can be rendered"
        }
    }
}