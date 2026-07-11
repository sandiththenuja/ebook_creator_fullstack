import React from 'react'
import MDEditor, { commands } from '@uiw/react-md-editor'
import { Type } from 'lucide-react'

const SimpleMDEditor = ({
  value,
  onChange,
  options,
  height = 400,
  preview = 'live',
}) => {
  return (
    <div data-color-mode="light" className="w-full">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#A1E3F9]/30">
        <Type className="w-4 h-4 text-[#3674B5]" />
        <span className="text-sm font-medium text-[#3674B5]">Markdown Editor</span>
      </div>

      <div className="rounded-xl overflow-hidden border border-[#A1E3F9]/30">
        <MDEditor
          value={value}
          onChange={onChange}
          height={height}
          preview={preview}
          commands={[
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.hr,
            commands.title,
            commands.divider,
            commands.link,
            commands.code,
            commands.image,
            commands.unorderedListCommand,
            commands.orderedListCommand,
            commands.checkedListCommand,
          ]}
          hideMenu={true}
        />
      </div>
    </div>
  )
}

export default SimpleMDEditor