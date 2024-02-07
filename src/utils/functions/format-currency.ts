export function formatCurrency(valu: number) {
    return valu.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"

    })
}