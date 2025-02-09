<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { onCommand, onAnyCommand, runCommand } from '@/util/command'
import { useKeyboardNavigation } from '@guijs/frontend-ui/util/navigation'
import { getSearchType, TYPE_WORDS } from './util'
import { ICONS } from './icons'
import { commandWithKeybindingFragment } from '../command/fragments'
import FindItem from './FindItem.vue'

export default {
  components: {
    FindItem,
  },

  setup () {
    // Open

    const isOpen = ref(false)
    let keepOpen = false

    watch(isOpen, value => {
      if (!value) {
        keepOpen = false
      }
    })

    function openAndKeepOpen () {
      if (isOpen.value) {
        keepOpen = true
      } else {
        isOpen.value = true
      }
    }

    // Search

    const searchText = ref('')
    const input = ref()
    // Reset text on close
    watch(isOpen, value => {
      if (!value) searchText.value = ''
    })

    const searchType = computed(() => getSearchType(searchText.value))
    const searchIcon = computed(() => {
      if (searchType.value) {
        return ICONS[searchType.value]
      }
      return 'search'
    })

    const { result } = useQuery(gql`
      query searchCommands ($text: String!) {
        searchCommands (text: $text) {
          ...command
        }
      }
      ${commandWithKeybindingFragment}
    `, () => ({
      text: searchText.value,
    }), () => ({
      fetchPolicy: 'no-cache',
      enabled: isOpen.value,
    }))
    const commands = useResult(result, [])

    async function selectCommand (id) {
      await runCommand(id)
    }

    // Keyboard navigation

    const { selectedIndex, onSelect } = useKeyboardNavigation(commands, 'find-modal')

    onSelect(command => {
      if (command) {
        selectCommand(command.id)
      }
    })

    const commandContainer = ref(null)

    watch(selectedIndex, value => {
      if (commandContainer.value) {
        const el = commandContainer.value.querySelector(`[data-index="${value}"]`)
        if (el) {
          el.scrollIntoViewIfNeeded()
        }
      }
    })

    // Commands
    for (const word of Object.keys(TYPE_WORDS)) {
      if (word === '?') continue
      onCommand(word, () => {
        openAndKeepOpen()
        searchText.value = word
        input.value.focus()
      })
    }

    onCommand('find', () => {
      isOpen.value = !isOpen.value
    })

    onCommand('command', () => {
      openAndKeepOpen()
      searchText.value = '>'
      input.value.focus()
    })

    onCommand('find-projects', () => {
      openAndKeepOpen()
      searchText.value = '<'
      input.value.focus()
    })

    onAnyCommand(command => {
      if (command.id !== 'find' && !keepOpen) {
        isOpen.value = false
      }
      keepOpen = false
    })

    return {
      isOpen,
      searchText,
      searchType,
      searchIcon,
      input,
      commands,
      selectCommand,
      selectedIndex,
      commandContainer,
    }
  },
}
</script>

<template>
  <VModal
    v-if="isOpen"
    keyScope="find-modal"
    shellClass="max-w-192"
    @close="isOpen = false"
  >
    <template #title>
      <VInput
        ref="input"
        v-model="searchText"
        placeholder="guijs.find.placeholder"
        autoFocus
        class="px-4 h-full"
      >
        <template #before>
          <i class="material-icons text-2xl text-gray-500 ml-2 mr-4">
            {{ searchIcon }}
          </i>
        </template>
      </VInput>
    </template>

    <div
      ref="commandContainer"
      class="flex flex-col"
    >
      <FindItem
        v-for="(command, index) of commands"
        :key="command.id"
        :command="command"
        :selected="selectedIndex === index"
        :data-index="index"
        class="flex-none"
        @select="selectCommand(command.id)"
        @mouseover.native="selectedIndex = index"
      />
    </div>

    <VEmpty v-if="!commands.length">
      No results found
    </VEmpty>
  </VModal>
</template>
