import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
const renderTooltip = (props) => (
    <Tooltip id="button-tooltip">
        Simple tooltip
    </Tooltip>
);

export default ({ handleUndo, handleRedo, handleDragControl, handleDelete, handleCopyRight, handleCopyLeft, setisToolactive, isToolactive, Setgrid, grid }) => {
    return <div className="topEditor">
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">

            </Tooltip>}
        >
            <button className="btn img-Box-tool"><img src={require('../../images/icons/7.png')} />
            </button>

        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">
                Erase
    </Tooltip>}
        >
            <button onClick={() => {
                setisToolactive(!isToolactive)
            }} className="btn img-Box-tool"><img src={require('../../images/icons/bb2.png')} />
            </button>
        </OverlayTrigger>

        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">
                Grid
    </Tooltip>}
        >
            <button onClick={() => {
                Setgrid(!grid)
            }} className="btn img-Box-tool"><img src={require('../../images/icons/bb4.png')} />
            </button>

        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">

            </Tooltip>}
        >
            <button className="btn img-Box-tool"><img src={require('../../images/icons/bb1.png')} />
            </button>
        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">
                Rotate Object 45 deg
    </Tooltip>}
        >
            <button className="btn img-Box-tool"><img src={require('../../images/icons/bb6.png')} />
            </button>
        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">
                Rotate Object 90 deg
    </Tooltip>}
        >
            <button className="btn img-Box-tool"><img src={require('../../images/icons/bb7.png')} />
            </button>
        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">
                Rotate Canvas
    </Tooltip>}
        >
            <button className="btn img-Box-tool"><img src={require('../../images/icons/bb5.png')} />
            </button>

        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">
                Copy Behind
    </Tooltip>}
        >
            <button className="btn img-Box-tool" onClick={() => { handleCopyLeft() }}><img src={require('../../images/icons/9.png')} />
            </button>
        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">
                Copy Front
    </Tooltip>}
        >
            <button className="btn img-Box-tool" onClick={() => { handleCopyRight() }}><img src={require('../../images/icons/10.png')} />
            </button>
        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">
                Remove Object
    </Tooltip>}
        >
            <button className="btn img-Box-tool" onClick={() => { handleDelete() }}><img src={require('../../images/icons/11.png')} />
            </button>
        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">
                Lock / Un Lock
    </Tooltip>}
        >
            <button className="btn img-Box-tool" onClick={() => { handleDragControl() }}><img src={require('../../images/icons/2.png')} />
            </button>
        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">

            </Tooltip>}
        >
            <button className="btn img-Box-tool" onClick={() => { handleDragControl() }}><img src={require('../../images/icons/2c.png')} />
            </button>
        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">
                Undo
    </Tooltip>}
        >
            <button onClick={() => { handleUndo() }} className="btn img-Box-tool"><img src={require('../../images/icons/5.png')} />
            </button>
        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">
                Redo
    </Tooltip>}
        >
            <button onClick={() => { handleRedo() }} className="btn img-Box-tool"><img src={require('../../images/icons/6.png')} />
            </button>
        </OverlayTrigger>
        <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">
            </Tooltip>}
        >
            <button className="btn img-Box-tool"><img src={require('../../images/icons/8.png')} />
            </button>
        </OverlayTrigger>
    </div>


}