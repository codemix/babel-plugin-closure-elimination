export function demo() {
    call(async () => {
        this.user = await createUser();
    })
}