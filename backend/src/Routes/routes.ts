import  {Hono}  from 'hono'

const api = new Hono().basePath('/api/v1')


api.post('/user/signup', (c) => {
    return c.text('Hello Hono!')
  })     
  api.post('/user/signin', (c) => {
    return c.text('Hello Hono!')
  })   
  api.post('/blog', (c) => {
    return c.text('Hello Hono!')
  })   
  api.put('/blog', (c) => {
    return c.text('Hello Hono!')
  })   
  api.get('/blog/:id', (c) => {
    return c.text('Hello Hono!')
  })  
  api.get('/blog/bulk', (c) => {
    return c.text('Hello Hono!')
  })    