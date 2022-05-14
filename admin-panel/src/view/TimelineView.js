import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import Timeline, {
    TimelineHeaders,
    SidebarHeader,
    DateHeader,
    TodayMarker
} from 'react-calendar-timeline'
import {Typography, Chip, Button, Stack,Skeleton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

class TimelineView extends React.Component {
    render() {
        return (
            <>
                <Typography variant="h3" sx={{my: 3}}>Timeline of Key box</Typography>
                <Stack direction="row" spacing={2}>
                    {
                        this.props.selectedBooking.start_time === undefined ?
                            <>
                                <Skeleton variant="rectangular" width={210} height={20}/>
                                {
                                //<Skeleton variant="text"/>
                                //<Skeleton variant="circular" width={40} height={40}/>
                                //<Skeleton variant="rectangular" width={210} height={118}/>
                                }
                            </> :
                            <>

                                <Chip label={"Check in: " + this.props.selectedBooking.start_time}/>

                                <Chip label={"Check out: " + this.props.selectedBooking.end_time}/>

                                <Chip label={this.props.selectedBooking.message} color={'primary'}/>

                                <Button variant="outlined" startIcon={<DeleteIcon/>}
                                    onClick={this.props.handleBookingDelete}
                                >
                                    Delete
                                </Button>
                            </>
                    }
                </Stack>
                <div className="Timeline">
                    <Timeline
                        groups={this.props.groups}
                        items={this.props.items}
                        defaultTimeStart={moment().subtract(7, "days")}
                        defaultTimeEnd={moment().add(14, "days")}
                        minZoom={12 * 60 * 60 * 1000} //12h
                        stackItems={true}
                        canMove={true}
                        canChangeGroup={true}
                        canResize={false}
                        traditionalZoom={true}
                        dragSnap={60 * 6 * 60 * 1000}
                        lineHeight={40}
                        itemHeightRatio={0.8}
                        clickTolerance={1}
                        onCanvasClick={(groupId, time, e) => {
                            this.props.handleDeSelectingBooking(groupId, time)
                        }}
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
                        onBoundsChange={(canvasTimeStart, canvasTimeEnd) => {
                            console.log({canvasTimeStart, canvasTimeEnd})
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
            </>
        );
    }
}

export default TimelineView;
