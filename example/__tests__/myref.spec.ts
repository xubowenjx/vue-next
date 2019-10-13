import { ref, computed, effect } from '../../packages/reactivity/src'

describe('ref', () => {
  // ref
  it('reactive/ref', () => {
    let a = ref(0)
    let b = ref(a)
    expect(a).toBe(b)
    let cp = computed(() => b.value)
    a.value = 1
    expect(cp.value).toBe(1)
    let dummy: any
    effect(() => {
      dummy = cp.value
    })
    a.value = 2
    expect(dummy).toBe(2)
  })
})
