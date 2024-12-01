export function getSlug() {
    const splitted = window.location.href.split(`/`)
    return splitted[splitted.length - 1]
}