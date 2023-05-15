import React, { useState, useEffect } from 'react'
import { BUSINESSFUNCTIONLIST, TICKETLIST, TECHNICIANLIST } from "../services/types";
import TechnicianCard from "../components/TechnicianCard";
import { FaAngleDown, FaChartBar } from 'react-icons/fa'
import TicketsBarChart from "../components/TicketsBarChart";
import { request_api, nlastWeek, get_tickets_per_user_for_chart } from "../services/services";

import { ThreeDots } from 'react-loader-spinner';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

export default function Home() {

	const [ status, setStatus ] = useState(true);
	const [ techniciandata, setTechniciandata ] = useState({});
	const [ ticketsData, setTicketsData ] = useState({});
	const [ chartData, setChartData ] = useState({});
	const [ selectedValue, setSelectedValue ] = useState("");
	const [ dateString, setDateString ] = useState("");

	const [state, setState] = useState([
		{
		  startDate: addDays(new Date(), -7),
		  endDate: new Date(),
		  key: 'selection'
		}
	]);

	const [isDateShow, setIsDateShow] = useState(false);

	useEffect( async () => {
		setStatus(true);

		const _allTechnicians = await request_api( TECHNICIANLIST, {"input":{"page": 1, "pageSize": 100}});
		const allTechnicians = _allTechnicians.data.getTechnicianList.userList;
		setTechniciandata(_allTechnicians.data.getTechnicianList);

		const testTicket = await request_api( TICKETLIST, {"input":{"page": 1, "pageSize": 1}} );
		const totalTicketCount = testTicket && testTicket.data && testTicket.data.getTicketList && testTicket.data.getTicketList.listInfo ? testTicket.data.getTicketList.listInfo.totalCount : 1;
		const _allTickets = await request_api( TICKETLIST, {"input":{"page": 1, "pageSize": totalTicketCount}});
		let allTickets;
		if(_allTickets && _allTickets.data && _allTickets.data.getTicketList && _allTickets.data.getTicketList.tickets.length){
			allTickets = _allTickets.data.getTicketList.tickets;
			setTicketsData(_allTickets.data.getTicketList);
		}

		const date_range_init = { start: state[0].startDate, end:state[0].endDate }

		setDateString(toDateString(date_range_init));
		
		if(allTickets.length && allTechnicians.length){
			const data = get_tickets_per_user_for_chart(allTickets, allTechnicians, toRangeDateString(date_range_init));
			setChartData(data);
		}

		setStatus(false);
	}, [])
	
	const handleChange = (item) => {
		setState([item.selection])
		let start = new Date(item.selection.startDate);
		let end = new Date(item.selection.endDate);
		start.setDate(start.getDate()+1);
		end.setDate(end.getDate()+1);
		const date_range = {
			'start': start,
			'end': end
		}
		setDateString(toDateString(date_range));
		if(ticketsData.tickets && ticketsData.tickets.length && techniciandata.userList && techniciandata.userList.length){
			const data = get_tickets_per_user_for_chart(ticketsData.tickets, techniciandata.userList, toRangeDateString(date_range));
			setChartData(data);
		}
	}

	const handleSelectChange = (event) => {
		setSelectedValue(event.target.value);
		const i = event.target.value;
		if(ticketsData.tickets && ticketsData.tickets.length && techniciandata.userList && techniciandata.userList.length){
			const data = get_tickets_per_user_for_chart(ticketsData.tickets, techniciandata.userList, toRangeDateString(nlastWeek(i)));
			setChartData(data);
		}
	}

	const toDateString = (date_range) => {
		return `${new Date(date_range.start).toLocaleDateString()} - ${new Date(date_range.end).toLocaleDateString()}`
	}

	const toRangeDateString = (date) => {
		// const date = new Date("2023-04-02T00:00:00");
		const startDate = date.start.toISOString().slice(0, 19);
		const start = startDate.substring(0, 11) + "00:00:00";
		const endDate = date.end.toISOString().slice(0, 19);
		const end = endDate.substring(0, 11) + "23:59:59";
		return {start, end};
	}

	return (
		<div className="m-0 h-screen font-sans text-base antialiased font-normal leading-default bg-gray-50 text-slate-500">
			{
				status ? 
				<div className='flex flex-col absolute z-[999] bg-slate-700 opacity-80 w-full h-full items-center justify-center'>
					<p className='m-0 text-zinc-100 text-2xl'>Retrieving data from Techbit SuperOps...</p>
					<ThreeDots 
						height="80" 
						width="120" 
						radius="9"
						color="#4fa94d" 
						ariaLabel="three-dots-loading"
						wrapperStyle={{}}
						wrapperClassName=""
						visible={true}
					/>
				</div> : <></>
			}
			{/* <p className="ml-[500px]">Output: {status}</p> */}
			<div className="absolute w-full bg-blue-500 min-h-75"></div>
			<aside className="fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0" aria-expanded="false">
			<div className="h-19">
				<i className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"></i>
				<a className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700" href="#">
				<img src="./assets/img/logo-ct-dark.png" className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo" />
				</a>
			</div>

			<hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

			<div className="items-center block w-auto max-h-screen overflow-auto grow basis-full">
				<ul className="flex flex-col pl-0 mb-0">
					
					<li className="mt-0.5 w-full">
						<a className="py-2.7 bg-blue-500/13 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors" href="#">
						<div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
							<FaChartBar className="relative top-0 text-sm leading-normal text-blue-500 ni ni-tv-2" />
						</div>
						<span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Dashboard</span>
						</a>
					</li>
					<li className="w-full mt-4">
						<h6 className="pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60">Technician List</h6>
					</li>
					{ 
						techniciandata && techniciandata.userList && techniciandata.userList.length ?
							techniciandata.userList.map(user => (
								<TechnicianCard 
									key={user.userId}
									id={user.userId}
									name={user.name}
									role={user.role.name ? user.role.name : ""}
									team = {user.name.team ? user.team.name : ""}
								/>
							)) :
							<></>
					}
				</ul>
			</div>
			</aside>


			<main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">

				<div className="w-full px-6 py-6 mx-auto h-screen">

					<div className="flex flex-wrap mt-0 -mx-3 h-full mt-0">
						<div className="w-full max-w-full px-3 mt-0 lg:w-12/12 lg:flex-none">
							<div className="h-full border-black/12.5 shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
								<div className="flex items-center justify-between border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-4">
									<h6 className="mb-0 capitalize">Number of tickets closed per technician per week</h6>

									

									<div className="relative inline-block text-left">
										<div>
											<button onClick={()=>setIsDateShow(!isDateShow)} type="button" className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button">
											Date Range
												<FaAngleDown className="-mr-1 h-4 w-4 text-gray-400"/>
											</button>
										</div>

										 <div className="absolute right-[666px] z-100 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-opacity-5 focus:outline-none">
										{	isDateShow ?
												<DateRangePicker
													onChange={item => handleChange(item)}
													showSelectionPreview={true}
													moveRangeOnFirstSelection={false}
													months={2}
													ranges={state}
													direction="horizontal"
												/> : <></>
											}
										 </div>
									</div>
									
									{/* <div className="sm:col-span-3">
										<div className="">
											<select value={selectedValue} onChange={handleSelectChange} id="week_type" name="week_type" className="block w-full rounded-md border px-[6px] py-[6px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
												<option value="0">This week</option>
												<option value="1">Last week</option>
												<option value="2">2 week ago</option>
											</select>
										</div>
									</div> */}
								</div>
								<hr className="h-px m-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
								
								<div className="flex-auto p-4">
									<p className='text-center mb-0 text-2xl'>{dateString}</p>
									<TicketsBarChart data = {chartData}/>
								</div>
							</div>
						</div>
					</div>

				</div>
			</main>
		</div>
	)
}
