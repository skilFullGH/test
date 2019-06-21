import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

export class App {
    constructor (private url: string) {};

    public async get (id: string) {
        try {
            const result = await axios.get(this.url + '/users/' + id);

            return {
                success: true,
                data: result.data
            };
        } catch (err) {
            return {
                success: false,
                error: err.toString()
            };
        }
    }

    public async getImage (idUser: string) {
        let image = '';

        if (fs.existsSync(path.resolve(`data/${idUser}`))) {
            image = fs.readFileSync(path.resolve(`data/${idUser}`), 'UTF8');

            return {
                success: true,
                data: image
            };
        } else {
            try {
                const result = await axios.get(`${this.url}/users/${idUser}/avatar`);

                image = Buffer.from(result.data).toString('base64');

                fs.writeFileSync(path.resolve(`data/${idUser}`), image);

                return {
                    success: true,
                    data: image
                };
            } catch (err) {
                return {
                    success: false,
                    error: err.toString()
                };
            }
        }
    }

    public deleteImage (idUser: string) {
        fs.unlinkSync(path.resolve(`data/${idUser}`));

        return {
            success: true
        };
    }

    public async parse () {
        let data = {
            page: 0,
            users: []
        };

        if (fs.existsSync(path.resolve(`data/users.json`))) {
            data = JSON.parse(fs.readFileSync(path.resolve(`data/users.json`), 'UTF8'));
        }

        try {
            const result = await axios.get(this.url + '/users?page=' + (data.page + 1));

            if (result.data.total_pages >= data.page + 1) {
                data.page++;
            }

            data.users = [
                ...data.users,
                result.data.data
            ];

            fs.writeFileSync(path.resolve(`data/users.json`), JSON.stringify(data));

            return {
                success: true,
                data: result.data
            };
        } catch (err) {
            return {
                success: false,
                error: err.toString()
            };
        }
    }
}
