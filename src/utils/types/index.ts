export type Category = {
    id: string,
    name: string,
    identifier: string,
    position: number
}

export type CategoryDto = {
    name: string,
    identifier: string,
    position: number
}

export type Element = {
    id: string,
    name: string,
    price: number,
    partId: string,
    category: string
}

export type ElementDto = {
    name: string,
    price: number,
    partId: string,
    category: string
}