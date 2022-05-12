import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import Timeline, {
    TimelineHeaders,
    SidebarHeader,
    DateHeader,
    TodayMarker
} from 'react-calendar-timeline'
import { Typography } from '@mui/material';

class TimelineView extends React.Component {
    render() {
        return (
            <div className="Timeline">
                <Typography variant="h3" sx={{ my: 3 }}>Timeline of Key box</Typography>
                <Timeline
                    groups={this.props.groups}
                    items={this.props.items}
                    defaultTimeStart={moment().add(-15, 'day')}
                    defaultTimeEnd={moment().add(15, 'day')}>
                    <TodayMarker interval={2000} />
                    <TimelineHeaders>
                        <SidebarHeader headerData={{ someData: 'extra' }}>
                            {({ getRootProps }) => {
                                return <Typography variant="h3" color="white" {...getRootProps()}>Keys</Typography>
                            }}
                        </SidebarHeader>
                        <DateHeader unit="primaryHeader" />
                        <DateHeader />
                    </TimelineHeaders>
                </Timeline>
            </div>
        );
    }
}

export default TimelineView;