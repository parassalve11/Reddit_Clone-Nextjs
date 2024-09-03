'use client'

import {TipTapRender , NodeHandlers, NodeHandler} from '@troop.com/tiptap-react-render'

const doc: NodeHandler = (props) => {
    return <>{props.children}</>
}

const paragraph: NodeHandler = (props) =>{
    return <>{props.children}</>
}

const text: NodeHandler = (props) =>{
    return <>{props.node.type}</>
}

const handlers : NodeHandlers = {
    doc:doc,
    text:text,
    paragraph: paragraph
}
export function RenderTOJson({data}:{data:any}){
    return <div className='px-2 py-2 text-xs font-medium'>
        <TipTapRender handlers={handlers} node={data} />
    </div>
}