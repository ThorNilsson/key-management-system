import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import Timeline, {
    TimelineHeaders,
    SidebarHeader,
    DateHeader,
    TodayMarker
} from 'react-calendar-timeline'
import {Typography, Chip, Grid} from '@mui/material';


class TimelineView extends React.Component {
    render() {
        return (
            <div className="Timeline">
                <Grid container spacing={0.5}>
                    <Grid>
                        <Typography variant="h3" sx={{my: 3}}>Timeline of Key box</Typography>
                    </Grid>
                    {
                        this.props.selectedBooking.start_time === undefined ? null : <>
                            <Grid>
                                <Chip label={"Check in: " + this.props.selectedBooking.start_time}/>
                            </Grid>
                            <Grid>
                                <Chip label={"Check out: " + this.props.selectedBooking.end_time}/>
                            </Grid>
                            <Grid>
                                <Chip label={this.props.selectedBooking.message} color={'primary'}/>
                            </Grid>
                        </>
                    }
                </Grid>

                <Timeline
                    groups={this.props.groups}
                    items={this.props.items}
                    minZoom={12 * 60 * 60 * 1000} //12h
                    stackItems={true}
                    canMove={true}
                    canChangeGroup={true}
                    canResize={false}
                    defaultTimeStart={moment().add(-15, 'day')}
                    defaultTimeEnd={moment().add(15, 'day')}
                    dragSnap={60 * 24 * 60 * 1000}
                    lineHeight={40}
                    itemHeightRatio={0.8}
                    clickTolerance={1}
                    onCanvasDoubleClick={(groupId, time, e) => {
                        this.props.handleNewBooking(groupId, time)
                        console.log({groupId, time, e})
                    }}
                    onItemSelect={(itemId, time, e) => {
                        this.props.handleSelectingBooking(itemId);
                    }}
                    onItemMove={(itemId, dragTime, newGroupOrder) => {
                        this.props.handleBookingMove(itemId, dragTime, this.props.groups[newGroupOrder]);
                    }}
                >
                    <TodayMarker interval={2000}/>
                    <TimelineHeaders>
                        <SidebarHeader headerData={{someData: 'extra'}}>
                            {({getRootProps}) => {
                                return <Typography variant="h3" color="white" {...getRootProps()}>Keys</Typography>
                            }}
                        </SidebarHeader>
                        <DateHeader unit="primaryHeader"/>
                        <DateHeader/>
                    </TimelineHeaders>
                </Timeline>
            </div>
        );
    }
}

export default TimelineView;
