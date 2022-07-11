import { Storage } from '../models/storage'

export const createStorage = () => {
    Storage.create({
        name: 'Absolut',
        measurementUnit: 'bottle',
        category: 'spirits',
        quantity: 20,
    })
    Storage.create({
        name: 'Jack Daniels',
        measurementUnit: 'bottle',
        category: 'spirits',
        quantity: 20,
    })
    Storage.create({
        name: 'Tuborg classic',
        measurementUnit: 'case',
        category: 'beer',
        quantity: 20,
    })
    Storage.create({
        name: 'Tuborg green',
        measurementUnit: 'case',
        category: 'beer',
        quantity: 20,
    })
}
