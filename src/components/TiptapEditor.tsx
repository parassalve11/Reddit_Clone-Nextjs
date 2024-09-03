'use client'

import { useEditor, EditorContent, Editor, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from './ui/button'


export function Menubar({editor}:{editor:Editor | null}){
    if(!editor){
        return null
    }
return <div className='mt-4'>
 <div className='flex items-center gap-x-2'>
 <Button type='button'
    className=''
   
    onClick={() => editor.chain().focus().toggleHeading({level:1}).run()}
    variant={editor.isActive('heading', {level:1}) ? 'default' : 'secondary'}
    >H<span className='text-xs flex items-baseline '>1</span>
    </Button>

    <Button
 type='button'
    onClick={() => editor.chain().focus().toggleHeading({level:2}).run()}
    variant={editor.isActive('heading',{level:2}) ? 'default' : 'secondary'}
    className='text-sm'
    >
        H<span className='text-xs flex items-baseline '>2</span>
    </Button>
 

<Button
   type="button"
   onClick={() => editor.chain().focus().toggleHeading({level:3}).run()}
   variant={editor.isActive('heading',{level:3}) ? 'default' : 'secondary'}
   className='text-sm'
   >
       H<span className='text-xs flex items-baseline '>3</span>
   </Button>
   <Button
  type='button'
   onClick={() => editor.chain().focus().toggleBold().run()}
   variant={editor.isActive('bold') ? 'default' : 'secondary'}
   className='text-sm'
   >
       Bold
   </Button>
   <Button
  type='button'
   onClick={() => editor.chain().focus().toggleItalic().run()}
   variant={editor.isActive('italic') ? 'default' : 'secondary'}
   className='text-sm'
   >
       Italic
   </Button>
   <Button
  type='button'
   onClick={() => editor.chain().focus().toggleStrike().run()}
   variant={editor.isActive('strike') ? 'default' : 'secondary'}
   className='text-sm'
   >
       Strike
   </Button>
 </div>

</div>
}

const Tiptap = ({setJson , json}:{setJson:any , json: JSONContent | null | string}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: json ?? '<p>Hello World! 🌎️</p>',
    editorProps:{
        attributes:{
            class:'prose'
        }
    },

    onUpdate : ({editor}) =>{
        const json = editor.getJSON();
        setJson(json)
    }
  })

  return <div>
    <Menubar editor={editor} />
    <EditorContent editor={editor} className='border min-h-[150px] p-2 rounded-lg mt-2' />
  </div>
}

export default Tiptap
