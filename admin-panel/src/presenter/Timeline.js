import TimelineView from "../view/TimelineView.js";

// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { rgbToHex } from "@mui/material";

// npm install --save react-calendar-timeline

const groups = [
    {
        id: 1,
        title: 'Key 1'
    },
    {
        id: 2,
        title: 'Key 2'
    },
    {
        id: 3,
        title: 'Key 3'
    },
    {
        id: 4,
        title: 'Key 4'
    }]

const items = [
    {
        id: 1,
        group: 1,
        start_time: moment().add(1, 'day').hours(0).minutes(0).seconds(0),
        end_time: moment().add(15, 'day').hours(6).minutes(0).seconds(0),
        itemProps: {
            // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
            'data-custom-attribute': 'Random content',
            'aria-hidden': true,
            onDoubleClick: () => { console.log('You clicked double!') },
            className: 'weekend',
            style: {
                background: 'grey'
            }
        }
    },
    {
        id: 2,
        group: 2,
        start_time: moment().add(-1, 'day').hours(0).minutes(0).seconds(0),
        end_time: moment().add(5, 'day').hours(0).minutes(0).seconds(0),
        itemProps: {
            // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
            'data-custom-attribute': 'Random content',
            'aria-hidden': true,
            onDoubleClick: () => { console.log('You clicked double!') },
            className: 'weekend',
            style: {
                background: 'grey'
            }
        }
    },
    {
        id: 3,
        group: 3,
        start_time: moment().add(2, 'day').hours(0).minutes(0).seconds(0),
        end_time: moment().add(9, 'day').hours(0).minutes(0).seconds(0),
        itemProps: {
            // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
            'data-custom-attribute': 'Random content',
            'aria-hidden': true,
            onDoubleClick: () => { console.log('You clicked double!') },
            className: 'weekend',
            style: {
                background: 'grey'
            }
        }
    },
    {
        id: 4,
        group: 4,
        start_time: moment().add(-15, 'day').hours(0).minutes(0).seconds(0),
        end_time: moment().add(7, 'day').hours(0).minutes(0).seconds(0),
        selectedBgColor: 'rgb(158,14,206)',
        itemProps: {
            // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
            'data-custom-attribute': 'Random content',
            'aria-hidden': true,
            onDoubleClick: () => { console.log('You clicked double!') },
            className: 'weekend',
            style: {
                background: 'grey'
            }
        }
    }
]

export default function TimelinePresenter() {
    return (
        <TimelineView groups={groups} items={items} />
    )
}