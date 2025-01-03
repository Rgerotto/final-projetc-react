import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import {useCabins} from '../cabins/useCabins';
import styled from "styled-components";
import Spinner from '../../ui/Spinner';
import Stats from "./Stats";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {bookings, isLoading: isLoading1} = useRecentBookings();
const {stays, confirmedStays, isLoading: isLoading2, numDays} = useRecentStays();
const {cabins ,isLoading: isLoading3} = useCabins();

  if(isLoading1 || isLoading2 || isLoading3) return <Spinner />
  console.log("bookings", bookings)
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length}/>
      <div>Today's activity</div>
      <div>chart stay durations</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
