import { reactive, computed, effect, ref } from '../../packages/reactivity/src'

import { mockWarn } from '@vue/runtime-test'

describe('my computed test', () => {
  mockWarn()
  // 数据绑定
  it('base reactive', () => {
    let target = reactive<{ foo?: number }>({})
    let comput = computed(() => target.foo)
    expect(target.foo).toBe(undefined)
    expect(comput.value).toBe(undefined)
    target.foo = 1
    expect(comput.value).toBe(1)
  })
  // 副本
  it('effect', () => {
    let target = reactive<{ foo?: number }>({})
    let comput = computed(() => target.foo)
    let dummy: any
    effect(() => {
      dummy = comput.value
    })
    expect(dummy).toBe(undefined)
    target.foo = 1
    expect(dummy).toBe(1)
  })
  // 链式调用
  it('chained value', () => {
    let target = reactive({ foo: 0 })
    let comput = computed(() => target.foo)
    let comput1 = computed(() => comput.value + 1)
    expect(comput1.value).toBe(1)
    expect(comput.value).toBe(0)
    target.foo++
    expect(comput1.value).toBe(2)
    expect(comput.value).toBe(1)
  })
  it('get/set', () => {
    let n = ref(0)
    let plusOne = computed({
      get: () => n.value + 1,
      set: value => {
        n.value = value - 1
      }
    })
    expect(plusOne.value).toBe(1)
    n.value++
    expect(plusOne.value).toBe(2)
    plusOne.value = 0
    expect(n.value).toBe(-1)
  })
  it('get/set effect', () => {
    let n = ref(0)
    let plusOne = computed({
      get: () => n.value + 1,
      set: value => {
        n.value = value - 1
      }
    })
    let dummy: any
    effect(() => {
      dummy = n.value
    })
    expect(dummy).toBe(0)
    plusOne.value = 0
    expect(dummy).toBe(-1)
  })
  // class 也是响应的
  it('reactive/class', () => {
    class Modal {
      count: number
      constructor() {
        this.count = 0
      }
      inc() {
        this.count++
      }
    }
    let cins = reactive(new Modal())
    let dummy: any
    effect(() => {
      dummy = cins.count
    })
    expect(dummy).toBe(0)
    cins.inc()
    expect(dummy).toBe(1)
  })
})
