QUnit.config.reorder = false;

let baseUrl = 'http://localhost:3030'

let user = {
    email: '',
    password: '123456',
    confirmPassword: '123456'
}
let token = '';
let lastAlbumId = '';
let album = {
    name: '',
    artist: 'Unknown',
    description: '',
    genre: "Random genre",
    imgUrl: "/images/Lorde.jpg",
    price: "15.25",
    releaseDate: "29 June 2024"
}


QUnit.module('User Functionality', async () => {

    QUnit.test('Registration testing', async (assert) => {

        let path = '/users/register';
        let random = Math.floor(Math.random() * 10000);

        user.email = `abv${random}@abv.bg`
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'

            },
            body: JSON.stringify(user)

        });
        let json = await response.json();
        assert.ok(response.ok)
        console.log(response)

        assert.ok(json.hasOwnProperty('email'), "email exists")
        assert.equal(json['email'], user.email, 'expected email')
        assert.strictEqual(typeof json.email, 'string', 'email has correct type')

        assert.ok(json.hasOwnProperty('password'), "password exists")
        assert.equal(json['password'], user.password, 'expected password')
        assert.strictEqual(typeof json.password, 'string', 'password has correct type')

        assert.ok(json.hasOwnProperty('_createdOn'), "_createdOn exists")
        assert.strictEqual(typeof json._createdOn, 'number', '_createdOn has correct type')

        assert.ok(json.hasOwnProperty('_id'), "_id exists")
        assert.strictEqual(typeof json._id, 'string', '_id has correct type')

        assert.ok(json.hasOwnProperty('accessToken'), "accessToken exists")
        assert.strictEqual(typeof json.accessToken, 'string', 'accessToken has correct type')

        token = json.accessToken;

    })
    QUnit.test('Login testing', async (assert) => {

        let path = '/users/login';
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'

            },
            body: JSON.stringify(user)
        });
        let json = await response.json();
        assert.ok(response.ok)

        assert.ok(json.hasOwnProperty('email'), "email exists")
        assert.equal(json['email'], user.email, 'expected email')
        assert.strictEqual(typeof json.email, 'string', 'email has correct type')

        assert.ok(json.hasOwnProperty('password'), "password exists")
        assert.equal(json['password'], user.password, 'expected password')
        assert.strictEqual(typeof json.password, 'string', 'password has correct type')

        assert.ok(json.hasOwnProperty('_createdOn'), "_createdOn exists")
        assert.strictEqual(typeof json._createdOn, 'number', '_createdOn has correct type')

        assert.ok(json.hasOwnProperty('_id'), "_id exists")
        assert.strictEqual(typeof json._id, 'string', '_id has correct type')

        assert.ok(json.hasOwnProperty('accessToken'), "accessToken exists")
        assert.strictEqual(typeof json.accessToken, 'string', 'accessToken has correct type')

        token = json.accessToken;



    })

})
QUnit.module('Album Functionality', async () => {
    QUnit.test("Get All Albums Testing", async (assert) => {
        let path = '/data/albums';
        let queryparams = '?sortBy=_createdOn%20desc&distinct=name';

        let response = await fetch(baseUrl + path + queryparams);
        let json = await response.json();
   


        assert.ok(Array.isArray(json), "Response is array")
        json.forEach(jsonData => {

            assert.ok(jsonData.hasOwnProperty('artist'), 'artist exist')
            assert.strictEqual(typeof jsonData.artist, 'string', 'artist is from correct type')

            assert.ok(jsonData.hasOwnProperty('description'), 'description exist')
            assert.strictEqual(typeof jsonData.description, 'string', 'description is from correct type')

            assert.ok(jsonData.hasOwnProperty('genre'), 'genre exist')
            assert.strictEqual(typeof jsonData.genre, 'string', 'genre is from correct type')


           /assert.ok(jsonData.hasOwnProperty('imgUrl'), 'imgUrl exist')
            assert.strictEqual(typeof jsonData.imgUrl, 'string', 'imgUrl is from correct type')

            assert.ok(jsonData.hasOwnProperty('name'), 'name exist')
            assert.strictEqual(typeof jsonData.name, 'string', 'name is from correct type')

            assert.ok(jsonData.hasOwnProperty('price'), 'price exist')
            assert.strictEqual(typeof jsonData.price, 'string', 'price is from correct type')

            assert.ok(jsonData.hasOwnProperty('releaseDate'), 'releaseDate exist')
            assert.strictEqual(typeof jsonData.releaseDate, 'string', 'releaseDate is from correct type')


            assert.ok(jsonData.hasOwnProperty('_createdOn'), '_createdOn exist')
            assert.strictEqual(typeof jsonData._createdOn, 'number', '_createdOn is from correct type')

            assert.ok(jsonData.hasOwnProperty('_id'), '_id exist')
            assert.strictEqual(typeof jsonData._id, 'string', '_id is from correct type')


            assert.ok(jsonData.hasOwnProperty('_ownerId'), '_ownerId exist')
            assert.strictEqual(typeof jsonData._ownerId, 'string', '_ownerId is from correct type')
        })


    })
     QUnit.test("Create Album Testing", async (assert) => {
        let path = '/data/albums';
        let random = Math.floor(Math.random() * 10000);
        album.name = `Random album title_${random}`
        album.description = `Description ${random}`
        album.artist = `Artist${random}`

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(album)
        })
        let jsonData = await response.json();

        assert.ok(jsonData.hasOwnProperty('_ownerId'), '_ownerId exist')    
        assert.strictEqual(typeof jsonData._ownerId, 'string', '_ownerId is from correct type')

        assert.ok(jsonData.hasOwnProperty('artist'), 'artist exist')
        assert.strictEqual(jsonData.artist, album.artist, 'artist is expected')
        assert.strictEqual(typeof jsonData.artist, 'string', 'artist is from correct type')

        assert.ok(jsonData.hasOwnProperty('description'), 'description exist')
        assert.strictEqual(jsonData.description, album.description, 'description is expected')
        assert.strictEqual(typeof jsonData.description, 'string', 'description is from correct type')

        assert.ok(jsonData.hasOwnProperty('genre'), 'genre exist')
        assert.strictEqual(jsonData.genre, album.genre, 'genre is expected')
        assert.strictEqual(typeof jsonData.genre, 'string', 'genre is from correct type')


        assert.ok(jsonData.hasOwnProperty('imgUrl'), 'imgUrl exist')
        assert.strictEqual(jsonData.imgUrl, album.imgUrl, 'imgUrl is expected')
        assert.strictEqual(typeof jsonData.imgUrl, 'string', 'imgUrl is from correct type')

        assert.ok(jsonData.hasOwnProperty('name'), 'name exist')
        assert.strictEqual(jsonData.name, album.name, 'name is expected')
        assert.strictEqual(typeof jsonData.name, 'string', 'name is from correct type')

        assert.ok(jsonData.hasOwnProperty('price'), 'price exist')
        assert.strictEqual(jsonData.price, album.price, 'price is expected')
        assert.strictEqual(typeof jsonData.price, 'string', 'price is from correct type')

        assert.ok(jsonData.hasOwnProperty('releaseDate'), 'releaseDate exist')
        assert.strictEqual(jsonData.releaseDate, album.releaseDate, 'releaseDate is expected')
        assert.strictEqual(typeof jsonData.releaseDate, 'string', 'releaseDate is from correct type')


        assert.ok(jsonData.hasOwnProperty('_createdOn'), '_createdOn exist')        
        assert.strictEqual(typeof jsonData._createdOn, 'number', '_createdOn is from correct type')

        assert.ok(jsonData.hasOwnProperty('_id'), '_id exist')        
        assert.strictEqual(typeof jsonData._id, 'string', '_id is from correct type')


        assert.ok(jsonData.hasOwnProperty('_ownerId'), '_ownerId exist')
        assert.strictEqual(typeof jsonData._ownerId, 'string', '_ownerId is from correct type')

         lastAlbumId = jsonData._id;




    })
    QUnit.test("Edit album testing", async (assert) => {
        let path = '/data/albums/';

        album.title = 'Edited Title'
        album.description = 'Edited description'
        album.price = "3"


        let response = await fetch(baseUrl + path + lastAlbumId, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(album)
        })

        let jsonData = await response.json();
       

        assert.ok(response.ok, 'response is ok')


        assert.ok(jsonData.hasOwnProperty('_ownerId'), '_ownerId exist')    
        assert.strictEqual(typeof jsonData._ownerId, 'string', '_ownerId is from correct type')

        assert.ok(jsonData.hasOwnProperty('artist'), 'artist exist')
        assert.strictEqual(jsonData.artist, album.artist, 'artist is expected')
        assert.strictEqual(typeof jsonData.artist, 'string', 'artist is from correct type')

        assert.ok(jsonData.hasOwnProperty('description'), 'description exist')
        assert.strictEqual(jsonData.description, album.description, 'description is expected')
        assert.strictEqual(typeof jsonData.description, 'string', 'description is from correct type')

        assert.ok(jsonData.hasOwnProperty('genre'), 'genre exist')
        assert.strictEqual(jsonData.genre, album.genre, 'genre is expected')
        assert.strictEqual(typeof jsonData.genre, 'string', 'genre is from correct type')


        assert.ok(jsonData.hasOwnProperty('imgUrl'), 'imgUrl exist')
        assert.strictEqual(jsonData.imgUrl, album.imgUrl, 'imgUrl is expected')
        assert.strictEqual(typeof jsonData.imgUrl, 'string', 'imgUrl is from correct type')

        assert.ok(jsonData.hasOwnProperty('name'), 'name exist')
        assert.strictEqual(jsonData.name, album.name, 'name is expected')
        assert.strictEqual(typeof jsonData.name, 'string', 'name is from correct type')

        assert.ok(jsonData.hasOwnProperty('price'), 'price exist')
        assert.strictEqual(jsonData.price, album.price, 'price is expected')
        assert.strictEqual(typeof jsonData.price, 'string', 'price is from correct type')

        assert.ok(jsonData.hasOwnProperty('releaseDate'), 'releaseDate exist')
        assert.strictEqual(jsonData.releaseDate, album.releaseDate, 'releaseDate is expected')
        assert.strictEqual(typeof jsonData.releaseDate, 'string', 'releaseDate is from correct type')


        assert.ok(jsonData.hasOwnProperty('_createdOn'), '_createdOn exist')        
        assert.strictEqual(typeof jsonData._createdOn, 'number', '_createdOn is from correct type')

        assert.ok(jsonData.hasOwnProperty('_id'), '_id exist')        
        assert.strictEqual(typeof jsonData._id, 'string', '_id is from correct type')


        assert.ok(jsonData.hasOwnProperty('_ownerId'), '_ownerId exist')
        assert.strictEqual(typeof jsonData._ownerId, 'string', '_ownerId is from correct type')

        lastAlbumId = jsonData._id;

    })
    QUnit.test("Delete album testing", async (assert) => {
        let path = '/data/albums/';


        let response = await fetch(baseUrl + path + lastAlbumId, {
            method: 'DELETE',
            headers: {
                'X-Authorization': token
            },

        })

        let jsonData = await response.json();
        console.log(jsonData)
        assert.truthy()

        assert.ok(response.ok, 'response is ok')
        assert.ok(jsonData.hasOwnProperty('_deletedOn'), '_deleteOn exist')       

    })


})