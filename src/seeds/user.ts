import { User } from '../models/user'

export const createUsers = () => {
    User.create({
        role: 'admin',
        username: 'admin',
        password: 'admin',
    })

    User.create({
        role: 'delivery',
        username: 'delivery1',
        password: 'delivery1',
    })
    User.create({
        role: 'delivery',
        username: 'delivery2',
        password: 'delivery2',
    })
    User.create({
        role: 'delivery',
        username: 'delivery3',
        password: 'delivery3',
    })
    User.create({
        role: 'delivery',
        username: 'delivery4',
        password: 'delivery4',
    })
    User.create({
        role: 'delivery',
        username: 'delivery5',
        password: 'delivery5',
    })
    User.create({
        role: 'delivery',
        username: 'delivery6',
        password: 'delivery6',
    })
    User.create({
        role: 'delivery',
        username: 'delivery7',
        password: 'delivery7',
    })

    User.create({
        role: 'bar',
        username: 'bar1',
        password: 'bar1',
        barName: 'Vessel',
    })
    User.create({
        role: 'bar',
        username: 'bar2',
        password: 'bar2',
        barName: 'Space',
    })
    User.create({
        role: 'bar',
        username: 'bar3',
        password: 'bar3',
        barName: 'Garden',
    })
    User.create({
        role: 'bar',
        username: 'bar4',
        password: 'bar4',
        barName: 'Vessel',
    })
    User.create({
        role: 'bar',
        username: 'bar5',
        password: 'bar5',
        barName: 'Space',
    })
    User.create({
        role: 'bar',
        username: 'bar6',
        password: 'bar6',
        barName: 'Garden',
    })
    User.create({
        role: 'bar',
        username: 'bar7',
        password: 'bar7',
        barName: 'Vessel',
    })

    User.create({ role: 'storage', username: 'storage1', password: 'storage1' })
    User.create({ role: 'storage', username: 'storage2', password: 'storage2' })
    User.create({ role: 'storage', username: 'storage3', password: 'storage3' })
    User.create({ role: 'storage', username: 'storage4', password: 'storage4' })
    User.create({ role: 'storage', username: 'storage5', password: 'storage5' })
    User.create({ role: 'storage', username: 'storage6', password: 'storage6' })
    User.create({ role: 'storage', username: 'storage7', password: 'storage7' })

    console.log('saved')
}
