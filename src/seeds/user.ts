import { User } from '../models/user'

export const createUsers = () => {
    User.create({
        role: 'admin',
        username: 'aliecs',
        password: 'ialapula',
    })

    User.create({
        role: 'delivery',
        username: 'cart1',
        password: 'tools',
    })
    User.create({
        role: 'delivery',
        username: 'cart2',
        password: 'brave',
    })
    User.create({
        role: 'delivery',
        username: 'cart3',
        password: 'look',
    })
    User.create({
        role: 'delivery',
        username: 'cart4',
        password: 'give',
    })
    User.create({
        role: 'delivery',
        username: 'cart5',
        password: 'find',
    })
    User.create({
        role: 'delivery',
        username: 'cart6',
        password: 'year',
    })

    User.create({
        role: 'bar',
        username: 'alejandro',
        password: 'altru',
        barName: 'Vessel',
    })
    User.create({
        role: 'bar',
        username: 'anna',
        password: 'aneva',
        barName: 'Space',
    })
    User.create({
        role: 'bar',
        username: 'daniel',
        password: 'danea',
        barName: 'Garden',
    })
    User.create({
        role: 'bar',
        username: 'hugo',
        password: 'hubro',
        barName: 'Space',
    })
    User.create({
        role: 'bar',
        username: 'mikael',
        password: 'mifry',
        barName: 'Vessel',
    })
    User.create({
        role: 'bar',
        username: 'simon',
        password: 'silah',
        barName: 'Space',
    })
    User.create({
        role: 'bar',
        username: 'niels',
        password: 'niped',
        barName: 'Space',
    })
    User.create({
        role: 'bar',
        username: 'aline',
        password: 'alwan',
        barName: 'Garden',
    })
    User.create({
        role: 'bar',
        username: 'saska',
        password: 'aloro',
        barName: 'Garden',
    })
    User.create({
        role: 'bar',
        username: 'emma',
        password: 'emnie',
        barName: 'Vessel',
    })
    User.create({
        role: 'bar',
        username: 'danilo',
        password: 'datim',
        barName: 'Space',
    })
    User.create({
        role: 'bar',
        username: 'allou',
        password: 'allou1',
        barName: 'Vessel',
    })
    User.create({
        role: 'bar',
        username: 'vadims',
        password: 'vapit',
        barName: 'Space',
    })
    User.create({
        role: 'bar',
        username: 'liva',
        password: 'lilie',
        barName: 'Garden',
    })
    User.create({
        role: 'bar',
        username: 'andreas',
        password: 'anjor',
        barName: 'Garden',
    })
    User.create({
        role: 'bar',
        username: 'casper',
        password: 'cahol',
        barName: 'Garden',
    })

    // User.create({ role: 'storage', username: 'store1', password: 'tools' })
    // User.create({ role: 'storage', username: 'store2', password: 'brave' })
    // User.create({ role: 'storage', username: 'store3', password: 'look' })
    // User.create({ role: 'storage', username: 'store4', password: 'give' })
    // User.create({ role: 'storage', username: 'store5', password: 'find' })
    // User.create({ role: 'storage', username: 'store6', password: 'year' })

    console.log('saved')
}
