describe('proxy', () => {
  class Model {
    name: string
    constructor(name: string) {
      this.name = name
    }
  }
  it('Proxy/get', () => {
    let handler = {
      get(target: any, prop: string) {
        return Reflect.get(target, prop) + '!'
      }
    }
    let source = new Model('hello')
    let model = new Proxy(source, handler)
    expect(source.name).toBe('hello')
    expect(model.name).toBe('hello!')
  })
  it('Proxy/set', () => {
    let handler = {
      get(target: any, prop: string) {
        let value = Reflect.get(target, prop)
        if (typeof value === 'string') {
          return value + '!'
        }
        if (typeof value === 'number') {
          return value + 1
        }
        return value
      },
      set(target: any, prop: string, reciever: any) {
        return Reflect.set(target, prop, reciever)
      }
    }

    let model = new Proxy(new Model('hello'), handler)
    // 如果没有set 方法 下面ts检查会不通过
    expect(model.count).toBe(void 0)
    model.count = 1
    expect(model.count).toBe(2)
  })
  it('Proxy/has', () => {
    let model = new Proxy(new Model('jack'), {
      set(target: any, prop: string, reciever: any) {
        return Reflect.set(target, prop, reciever)
      },
      // prop in target
      has(target, prop) {
        return false
        //return Reflect.has(target, prop)
      }
    })
    expect('name' in model).toBe(false)
    model.tag = 'm'
  })
})
