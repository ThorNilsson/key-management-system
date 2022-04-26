import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import Timeline, {
    TimelineHeaders,
    SidebarHeader,
    DateHeader,
    CustomHeader
} from 'react-calendar-timeline'
import { Typography } from '@mui/material';

class TimelineView extends React.Component {
    render() {
        return (
            <div className="Timeline">
                <Typography variant="h3" sx={{ mb: 3, mt: 3 }}>Timeline of Key Status</Typography>
                <h1> </h1>
                <Timeline
                    groups={this.props.groups}
                    items={this.props.items}
                    defaultTimeStart={moment().add(-15, 'day')}
                    defaultTimeEnd={moment().add(15, 'day')}>
                    <TimelineHeaders>
                        <SidebarHeader headerData={{ someData: 'extra' }}>
                            {({ getRootProps }) => {
                                return <div {...getRootProps()}>Keys</div>
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