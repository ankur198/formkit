import { createSection } from '../compose'

export const fieldset = createSection('fieldset', () => ({
  $el: 'fieldset',
  attrs: {
    id: '$id',
    'aria-describedby': {
      if: '$help',
      then: '$: "help-" + $id',
      else: undefined,
    },
  },
}))
