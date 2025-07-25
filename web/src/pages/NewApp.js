import React from 'react';
import { ReactComponent as LeftGraphic1 } from '../new_icons/left_graphic_1.svg';
import { ReactComponent as RightGraphic1 } from '../new_icons/right_graphic_1.svg';

class NewApp extends React.Component {

  render() {

    return (
      <div className='flex flex-col w-full bg-black text-white'>

        {/* This is navbar */}
        <div className='flex justify-between p-3 items-center align-center'>
          <div className="size- inline-flex justify-center items-center gap-6">
            <div className="size- p-2.5 opacity-80 flex justify-center items-center gap-2.5">
              <div className="justify-start text-white text-sm font-light font-['Fira_Code']">[About Us]</div>
            </div>
            <div className="size- p-2.5 opacity-80 flex justify-center items-center gap-2.5">
              <div className="justify-start text-white text-sm font-light font-['Fira_Code']">[Playlist]</div>
            </div>
            <div className="size- p-2.5 opacity-80 flex justify-center items-center gap-2.5">
              <div className="justify-start text-white text-sm font-light font-['Fira_Code']">[Contact]</div>
            </div>
          </div>
          <div>
            <svg width="149" height="21" viewBox="0 0 149 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.5032 4.83844L17.356 0.441124C17.356 0.441124 17.356 6.94579 17.3381 8.14166H11.1562L6.71552 12.1483L4.94734 12.1828V8.14316L4.94285 4.54658C9.07059 4.61842 13.2328 4.45677 17.3575 4.54658C17.392 3.18458 17.3351 1.80462 17.3575 0.442622H4.88296V4.35051L0.807617 4.29064V20.9624H4.94734V12.7545C9.07509 12.8263 17.2303 12.75 17.2303 12.75C17.2303 12.75 17.4219 18.2384 17.3575 20.9654H21.4973V16.7447L18.3172 12.753V12.7605L18.3397 11.8011L21.5002 8.55774L21.5077 4.83694" fill="white" />
              <path d="M29.137 4.54508C29.1026 3.18308 29.1594 1.80312 29.137 0.441124H45.6869V4.54957C40.1817 4.63638 34.6392 4.42535 29.137 4.54957C29.1669 5.74245 29.1145 10.9555 29.137 12.1483L30.8228 12.1708L35.3458 8.25541L41.5891 8.36467L41.5547 12.759H29.14V16.8629C34.6451 16.9902 40.1877 16.7731 45.6929 16.8629V20.9744H29.1355V16.8659C29.3616 17.8283 30.4111 20.9849 29.1355 20.9744C29.0382 20.9744 25.0976 16.8704 24.9958 16.8704L24.9883 4.84742C25.0706 4.29813 28.33 4.56903 29.1355 4.55406V4.54658L29.137 4.54508Z" fill="white" />
              <path d="M129.379 0.430214H125.241V20.9545H129.379V0.430214Z" fill="white" />
              <path d="M53.4611 4.54508C53.4985 3.18308 53.4341 1.80312 53.4611 0.441124H70.011V4.54957C64.5088 4.63938 58.9632 4.41786 53.4611 4.54957C53.4311 5.73796 53.4341 6.95028 53.4611 8.14166C57.3074 8.22847 65.8937 8.2135 65.8937 8.2135C65.8937 8.2135 65.8338 11.5047 65.8758 12.7575C66.6812 12.7769 70.0215 12.7575 70.0215 12.7575L70.014 16.8614L65.8758 20.9624H49.3258V16.854C54.8265 16.7642 60.3736 16.9812 65.8758 16.854C65.9087 15.4994 65.9207 14.1045 65.8758 12.75C61.7465 12.6602 57.5888 12.8144 53.4611 12.75C53.4611 12.5015 49.3184 8.3033 49.3184 8.05485C49.3184 6.76469 51.6959 7.63277 53.4656 8.12669C52.6601 8.10873 49.3184 8.05485 49.3184 8.05485L49.3258 4.5346C50.6988 4.51215 52.0911 4.56903 53.4656 4.5346L53.4611 4.54508Z" fill="white" />
              <path d="M78.4696 4.54493C78.4891 3.7442 78.2106 0.512816 78.7676 0.429001L88.3241 0.436483C90.8843 3.57207 91.7347 4.6063 90.8843 4.54493C86.7745 4.45064 82.5794 4.46561 78.4696 4.54493Z" fill="white" />
              <path d="M78.4712 4.54507C78.3813 8.61909 78.3768 12.7874 78.4712 16.8569C78.832 17.496 82.5495 21.16 81.2889 20.9654L74.0455 14.1719L73.8164 4.54059C75.363 4.52113 76.9291 4.57501 78.4757 4.54059L78.4712 4.54357V4.54507Z" fill="white" />
              <path d="M90.8834 4.54488C91.7982 4.56433 88.3232 0.436428 88.3232 0.436428L95.0217 7.2554L95.0291 16.5679C94.9468 17.1172 91.6889 16.8463 90.8834 16.8612C90.9733 12.7872 90.9778 8.6189 90.8834 4.54937V4.54488Z" fill="white" />
              <path d="M90.8844 16.8597C90.8649 17.6604 91.1434 20.8918 90.5865 20.9756L81.2874 20.9681C81.265 19.6061 78.5042 18.2262 78.4697 16.8597C82.5675 16.9794 86.7821 16.9495 90.8844 16.8597Z" fill="white" />
              <path d="M144.517 8.84495C144.967 10.2369 145.107 12.8816 145.107 12.8816L148.799 16.9032V20.9548H144.607C144.607 20.9548 144.512 15.4589 144.487 12.8816C140.422 12.8367 137.788 12.9759 137.788 12.9759C137.788 12.9759 137.649 18.2682 137.642 20.9548H133.566V16.8508L137.04 12.9115L137.025 8.69528L133.571 4.82631V0.430499H137.646V4.6093C137.646 6.01919 137.642 7.43058 137.646 8.83748C141.702 8.90932 140.467 8.89735 144.524 8.83748C144.547 6.14791 144.539 0.478404 144.539 0.478404L148.806 0.429001V4.45064L145.104 8.8255L145.119 16.8987" fill="white" />
              <path d="M107.742 8.63994L103.08 8.61899L103.011 20.9503L98.873 20.9473V0.433532H100.107L107.733 7.88262C107.733 7.88262 107.711 7.27645 107.742 8.63994C109.276 8.58307 110.861 8.60103 112.396 8.63994C112.427 7.27645 112.37 9.05903 112.393 7.69703L120.028 0.432034L121.266 0.43503V20.9488L117.128 20.9518L117.134 8.63845C115.76 8.6145 113.772 8.67587 112.397 8.64144C112.333 11.3684 112.4 16.767 112.4 16.767L107.817 16.7596L107.742 8.64294V8.63994Z" fill="white" />
            </svg>
          </div>
          <div className='flex justify-center items-center'>
            <div className="w-56 h-11 px-6 py-3 bg-white rounded-[30px] outline outline-[0.50px] outline-offset-[-0.50px] outline-white inline-flex justify-center items-center gap-2.5">
              <div className="justify-start text-black text-sm font-light font-['Fira_Code']">Upload Your Track</div>
            </div>
            <div className="size-11 relative bg-white rounded-3xl outline outline-[0.50px] outline-offset-[-0.50px] outline-white overflow-hidden p-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20.2498 12H4.25" stroke="black" stroke-width="0.8" stroke-linecap="square" />
                <path d="M14.5898 17.66C14.5898 14.7503 17.1524 12 20.2499 12" stroke="black" stroke-width="0.8" stroke-linecap="square" />
                <path d="M14.5898 6.33995C14.5898 9.2497 17.1524 12 20.2499 12" stroke="black" stroke-width="0.8" stroke-linecap="square" />
              </svg>
            </div>
          </div>
        </div>

        {/* This is the hero section */}
        <div className='flex flex-col w-full'>
          <div className="w-[1013.40px] justify-start text-white text-[180px] font-normal font-['Helvetica_Neue'] uppercase">Resomix </div>
          <div className='flex w-full justify-evenly items-center'>
            <div className='flex w-1/2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="46" height="47" viewBox="0 0 46 47" fill="none">
                <path d="M1.80397e-06 46.8142L2.26019e-06 36.3806L18.1883 36.3806L21.2678 39.472L30.9874 39.472L0.00385252 8.26786L7.41005 0.832965L38.4937 31.9367L38.4937 21.9861L35.4142 18.8947L35.4142 0.829101L46 0.829102L46 39.3754L38.59 46.8142L1.80397e-06 46.8142Z" fill="white" />
              </svg>
              <div className="w-[632px] justify-start text-white text-2xl font-normal font-['Helvetica_Neue'] uppercase">A deep learning platform that helps DJs <br />discover tracks by feeling, not by genre. </div>
            </div>
            <div className="w-1/2 justify-start text-white text-7xl font-medium font-['Helvetica_Neue'] uppercase">the Soul of Sound</div>
          </div>
          <div className='flex w-full justify-between'>
            <div></div>
            <div className='flex'>
              <div className="w-[456px] text-right justify-start text-white text-2xl font-light font-['Helvetica_Neue'] uppercase">Unbounded by trends,<br />built for emotional resonance</div>
              <div className="w-14 h-11 relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="44" viewBox="0 0 55 44" fill="none">
                  <path d="M53.592 42.1365L53.592 43.3836C47.8816 43.3836 43.7645 37.9461 39.7735 32.6833C36.0191 27.7197 32.1228 22.594 27.3115 22.594L27.3115 21.3469C33.0219 21.3469 37.1391 26.7844 41.1301 32.0472C44.8845 36.9983 48.765 42.1365 53.592 42.1365Z" fill="white" stroke="white" />
                  <path d="M53.592 31.7344L53.592 32.9816C48.0394 32.9816 43.9222 30.2628 39.947 27.6439C36.0033 25.0498 32.2805 22.593 27.3115 22.593L27.3115 21.3459C32.8642 21.3459 36.9814 24.0646 40.9566 26.6836C44.8845 29.2901 48.6073 31.7344 53.592 31.7344Z" fill="white" stroke="white" />
                  <path d="M27.2969 21.3481L27.2969 22.5956L53.5932 22.5956L53.5932 21.3481L27.2969 21.3481Z" fill="white" stroke="white" />
                  <path d="M53.592 10.9599L53.592 12.207C48.6073 12.207 44.8845 14.6639 40.9566 17.2579C36.9814 19.8893 32.8642 22.5956 27.3115 22.5956L27.3115 21.3485C32.2963 21.3485 36.0191 18.8916 39.947 16.2976C43.9222 13.6662 48.0394 10.9599 53.592 10.9599Z" fill="white" stroke="white" />
                  <path d="M53.592 0.558884L53.592 1.80601C48.765 1.80601 44.8845 6.93168 41.1301 11.8952C37.1391 17.1581 33.0219 22.5956 27.3115 22.5956L27.3115 21.3485C32.1386 21.3485 36.0191 16.2228 39.7735 11.2592C43.7487 5.99636 47.8659 0.558885 53.592 0.558884Z" fill="white" stroke="white" />
                  <path d="M27.2961 21.3485L27.2961 22.5956C21.5857 22.5956 17.4686 17.1581 13.4776 11.8952C9.72322 6.93168 5.82688 1.80601 1.01562 1.80601L1.01562 0.558886C6.72604 0.558885 10.8432 5.99636 14.8342 11.2592C18.5886 16.2228 22.4691 21.3485 27.2961 21.3485Z" fill="white" stroke="white" />
                  <path d="M27.2961 21.3485L27.2961 22.5956C21.7435 22.5956 17.6263 19.8768 13.6511 17.2579C9.70744 14.6639 5.98463 12.207 1.01562 12.207L1.01562 10.9599C6.56829 10.9599 10.6855 13.6786 14.6607 16.2976C18.5886 18.8916 22.3114 21.3485 27.2961 21.3485Z" fill="white" stroke="white" />
                  <path d="M1 21.3482L1 22.5957L27.2963 22.5957L27.2963 21.3482L1 21.3482Z" fill="white" stroke="white" />
                  <path d="M27.2961 21.3462L27.2961 22.5934C22.3114 22.5934 18.5886 25.0502 14.6607 27.6442C10.6855 30.2757 6.56829 32.9819 1.01562 32.9819L1.01562 31.7348C6.00041 31.7348 9.72321 29.278 13.6511 26.684C17.6263 24.065 21.7435 21.3462 27.2961 21.3462Z" fill="white" stroke="white" />
                  <path d="M27.2961 21.3469L27.2961 22.594C22.4691 22.594 18.5886 27.7197 14.8342 32.6833C10.8432 37.9461 6.72604 43.3836 1.01562 43.3836L1.01562 42.1365C5.84266 42.1365 9.72322 37.0108 13.4776 32.0472C17.4686 26.7844 21.5857 21.3469 27.2961 21.3469Z" fill="white" stroke="white" />
                </svg>
              </div>
            </div>
            <div className='flex justify-evenly gap-1 mr-2'>
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16.5001" cy="16.5002" r="15.5001" fill="white" stroke="white" stroke-width="0.5" />
                <path d="M17.3486 18.4235V23.7656H14.8938V18.4235H12.8545V16.2574H14.8938V15.4693C14.8938 12.5434 16.1165 11.0049 18.7034 11.0049C19.4965 11.0049 19.6948 11.1324 20.1291 11.2362V13.3787C19.6429 13.2937 19.506 13.2466 19.0008 13.2466C18.4013 13.2466 18.0803 13.4164 17.7876 13.7515C17.4949 14.0866 17.3486 14.667 17.3486 15.4976V16.2621H20.1291L19.3832 18.4282H17.3486V18.4235Z" stroke="#030303" />
              </svg>

              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16.6046" cy="16.5003" r="15.5001" fill="white" stroke="white" stroke-width="0.5" />
                <path d="M20.2482 22.8541H12.9645C11.958 22.8541 11.1357 22.0321 11.1357 21.0259V13.7446C11.1357 12.7385 11.958 11.9164 12.9645 11.9164H20.2482C21.2547 11.9164 22.077 12.7385 22.077 13.7446V21.0259C22.077 22.0366 21.2592 22.8541 20.2482 22.8541Z" stroke="black" />
                <path d="M14.6231 19.3723C15.1533 19.9023 15.8587 20.1943 16.6091 20.1943C17.3595 20.1943 18.0605 19.9023 18.5952 19.3723C19.1254 18.8422 19.4174 18.137 19.4174 17.3869C19.4174 16.6367 19.1254 15.9315 18.5952 15.4015C18.0649 14.8714 17.3595 14.5795 16.6091 14.5795C15.8587 14.5795 15.1533 14.8714 14.6231 15.4015C14.0928 15.9315 13.8008 16.6367 13.8008 17.3869C13.8008 18.137 14.0928 18.8422 14.6231 19.3723Z" stroke="black" />
                <path d="M19.964 14.4874C20.2618 14.4874 20.5032 14.2459 20.5032 13.9481C20.5032 13.6503 20.2618 13.4089 19.964 13.4089C19.6662 13.4089 19.4248 13.6503 19.4248 13.9481C19.4248 14.2459 19.6662 14.4874 19.964 14.4874Z" stroke="black" />
              </svg>

              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16.7149" cy="16.5003" r="15.5001" fill="white" stroke="white" stroke-width="0.5" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4664 12.7045H12L16.1099 18.1409L12.2629 22.7013H14.0404L16.95 19.2521L19.5336 22.6696H23L18.7707 17.0753L18.7781 17.0849L22.4197 12.768H20.6422L17.938 15.9738L15.4664 12.7045ZM13.9134 13.6566H14.9925L21.0866 21.7175H20.0075L13.9134 13.6566Z" fill="black" />
              </svg>
            </div>
          </div>
        </div>

        {/* This is Section One */}
        <div className='my-40'>
          <div className='flex flex-col w-full'>
            <div className='flex justify-between'>
              <div className="w-[599px] justify-start text-white text-5xl font-extralight font-['Helvetica_Neue'] uppercase">Resomix is the first sonic analysis platform <br />of its kind</div>
              <div className='flex items-end'>
                <RightGraphic1 />
              </div>
            </div>
            <div className='flex justify-between'>
              <div className=''>
                <LeftGraphic1 />
              </div>
              <div className="w-[795px] text-right justify-start text-white text-5xl font-extralight font-['Helvetica_Neue'] uppercase">bringing back results that<br />match its mood and spirit<br />in fresh, surprising ways</div>
            </div>
          </div>
        </div>

        {/* This is Section Two */}
        <div className='my-20 bg-gray-500'>
          <div className='flex flex-col justify-between items-center'>
            <div className=''></div>
            <div className='flex flex-col justify-center items-center'>
              <div className=''>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="55" viewBox="0 0 50 55" fill="none">
                  <path d="M50 21.7401C50 20.7283 49.1035 19.8021 47.4841 19.1323L40.4714 16.2396L47.4841 13.3469C49.1035 12.6771 50 11.7509 50 10.7391C50 9.72736 49.1035 8.80111 47.4841 8.13136L30.6825 1.22012C27.5448 -0.0766285 22.4407 -0.0766285 19.3031 1.22012L2.51591 8.13136C0.896472 8.80111 0 9.72736 0 10.7391C0 11.7509 0.896472 12.6771 2.51591 13.3469L9.52863 16.2396L2.51591 19.1323C0.896472 19.8021 0 20.7283 0 21.7401C0 22.7518 0.896472 23.6781 2.51591 24.3478L9.52863 27.2406L2.51591 30.1333C0.896472 30.8031 0 31.7293 0 32.7411C0 33.7528 0.896472 34.6791 2.51591 35.3488L9.52863 38.2416L2.51591 41.1343C0.896472 41.8041 0 42.7303 0 43.7421C0 44.7538 0.896472 45.6801 2.51591 46.3498L19.3031 53.2611C20.8647 53.9023 22.9323 54.23 24.9855 54.23C27.0387 54.23 29.1064 53.9023 30.668 53.2611L47.4552 46.3498C49.0746 45.6801 49.9711 44.7538 49.9711 43.7421C49.9711 42.7303 49.0746 41.8041 47.4552 41.1343L40.4425 38.2416L47.4552 35.3488C49.0746 34.6791 49.9711 33.7528 49.9711 32.7411C49.9711 31.7293 49.0746 30.8031 47.4552 30.1333L40.4569 27.2406L47.4696 24.3478C49.1035 23.6781 50 22.7518 50 21.7401ZM2.79063 12.6914C1.47484 12.1499 0.708502 11.4374 0.708502 10.7391C0.708502 10.0409 1.46038 9.32836 2.79063 8.78686L19.5923 1.87562C21.0816 1.26287 23.048 0.94937 25 0.94937C26.9665 0.94937 28.9184 1.26287 30.4077 1.87562L47.1949 8.78686C48.5107 9.32836 49.277 10.0409 49.277 10.7391C49.277 11.4374 48.5252 12.1499 47.1949 12.6914L39.5171 15.8549L30.6825 12.2211C27.5448 10.9244 22.4407 10.9244 19.3031 12.2211L10.4685 15.8549L2.79063 12.6914ZM38.5917 16.2396L30.4077 19.6026C27.4291 20.8281 22.5709 20.8281 19.5923 19.6026L11.4083 16.2396L19.5923 12.8766C21.0816 12.2639 23.048 11.9504 25 11.9504C26.9665 11.9504 28.9184 12.2639 30.4077 12.8766L38.5917 16.2396ZM47.2094 41.7898C48.5252 42.3313 49.2915 43.0438 49.2915 43.7421C49.2915 44.4403 48.5396 45.1528 47.2094 45.6943L30.4077 52.6056C27.4291 53.8311 22.5709 53.8311 19.5923 52.6056L2.79063 45.6943C1.47484 45.1528 0.708502 44.4403 0.708502 43.7421C0.708502 43.0438 1.46038 42.3313 2.79063 41.7898L10.4685 38.6263L19.3031 42.2601C20.8647 42.9013 22.9323 43.2291 24.9855 43.2291C27.0387 43.2291 29.1064 42.9013 30.668 42.2601L39.5026 38.6263L47.2094 41.7898ZM11.4083 38.2416L19.5923 34.8786C21.0816 34.2658 23.048 33.9523 25 33.9523C26.9665 33.9523 28.9184 34.2658 30.4077 34.8786L38.5917 38.2416L30.4077 41.6046C27.4291 42.8301 22.5709 42.8301 19.5923 41.6046L11.4083 38.2416ZM47.2094 30.7888C48.5252 31.3303 49.2915 32.0428 49.2915 32.7411C49.2915 33.4393 48.5396 34.1518 47.2094 34.6933L39.5315 37.8568L30.6825 34.2231C27.5448 32.9263 22.4407 32.9263 19.3031 34.2231L10.4685 37.8568L2.79063 34.6933C1.47484 34.1518 0.708502 33.4393 0.708502 32.7411C0.708502 32.0428 1.46038 31.3303 2.79063 30.7888L10.4685 27.6253L19.3031 31.2591C20.8647 31.9003 22.9323 32.2281 24.9855 32.2281C27.0387 32.2281 29.1064 31.9003 30.668 31.2591L39.5026 27.6253L47.2094 30.7888ZM11.4083 27.2406L19.5923 23.8776C21.0816 23.2648 23.048 22.9513 25 22.9513C26.9665 22.9513 28.9184 23.2648 30.4077 23.8776L38.5917 27.2406L30.4077 30.6036C27.4291 31.8291 22.5709 31.8291 19.5923 30.6036L11.4083 27.2406ZM39.5315 26.8558L30.6969 23.2221C27.5593 21.9253 22.4552 21.9253 19.3175 23.2221L10.4829 26.8558L2.80509 23.6923C1.4893 23.1508 0.722961 22.4383 0.722961 21.7401C0.722961 21.0418 1.47484 20.3293 2.80509 19.7878L10.4829 16.6243L19.3175 20.2581C20.8791 20.8993 22.9468 21.2271 25 21.2271C27.0532 21.2271 29.1209 20.8993 30.6825 20.2581L39.5171 16.6243L47.1949 19.7878C48.5107 20.3293 49.277 21.0418 49.277 21.7401C49.277 22.4383 48.5252 23.1508 47.1949 23.6923L39.5315 26.8558Z" fill="white" />
                </svg>
              </div>
              <div className="w-[968px] text-center justify-start text-white text-lg font-extralight font-['Auger_Mono_TEST']">Resomix goes deeper than anyone else, carefully selecting music <br />that reflects the energy and vibe you’re looking for,<br />with a quality-over-quantity approach.</div>
            </div>
            <div className=''>
              <svg xmlns="http://www.w3.org/2000/svg" width="2" height="84" viewBox="0 0 2 84" fill="none">
                <path d="M1 83.5773L1.57735 83L1 82.4227L0.42265 83L1 83.5773ZM1 0.5H0.9V0.700243H1H1.1V0.5H1ZM1 1.10073H0.9V1.50121H1H1.1V1.10073H1ZM1 1.9017H0.9V2.30218H1H1.1V1.9017H1ZM1 2.70267H0.9V3.10316H1H1.1V2.70267H1ZM1 3.50364H0.9V3.90413H1H1.1V3.50364H1ZM1 4.30461H0.9V4.7051H1H1.1V4.30461H1ZM1 5.10558H0.9V5.50607H1H1.1V5.10558H1ZM1 5.90655H0.9V6.30704H1H1.1V5.90655H1ZM1 6.70753H0.9V7.10801H1H1.1V6.70753H1ZM1 7.5085H0.9V7.90898H1H1.1V7.5085H1ZM1 8.30947H0.9V8.70995H1H1.1V8.30947H1ZM1 9.11044H0.9V9.51092H1H1.1V9.11044H1ZM1 9.91141H0.9V10.3119H1H1.1V9.91141H1ZM1 10.7124H0.9V11.1129H1H1.1V10.7124H1ZM1 11.5133H0.9V11.9138H1H1.1V11.5133H1ZM1 12.3143H0.9V12.7148H1H1.1V12.3143H1ZM1 13.1153H0.9V13.5158H1H1.1V13.1153H1ZM1 13.9163H0.9V14.3167H1H1.1V13.9163H1ZM1 14.7172H0.9V15.1177H1H1.1V14.7172H1ZM1 15.5182H0.9V15.9187H1H1.1V15.5182H1ZM1 16.3192H0.9V16.7197H1H1.1V16.3192H1ZM1 17.1201H0.9V17.5206H1H1.1V17.1201H1ZM1 17.9211H0.9V18.3216H1H1.1V17.9211H1ZM1 18.7221H0.9V19.1226H1H1.1V18.7221H1ZM1 19.5231H0.9V19.9235H1H1.1V19.5231H1ZM1 20.324H0.9V20.7245H1H1.1V20.324H1ZM1 21.125H0.9V21.5255H1H1.1V21.125H1ZM1 21.926H0.9V22.3265H1H1.1V21.926H1ZM1 22.7269H0.9V23.1274H1H1.1V22.7269H1ZM1 23.5279H0.9V23.9284H1H1.1V23.5279H1ZM1 24.3289H0.9V24.7294H1H1.1V24.3289H1ZM1 25.1299H0.9V25.5303H1H1.1V25.1299H1ZM1 25.9308H0.9V26.3313H1H1.1V25.9308H1ZM1 26.7318H0.9V27.1323H1H1.1V26.7318H1ZM1 27.5328H0.9V27.9333H1H1.1V27.5328H1ZM1 28.3337H0.9V28.7342H1H1.1V28.3337H1ZM1 29.1347H0.9V29.5352H1H1.1V29.1347H1ZM1 29.9357H0.9V30.3362H1H1.1V29.9357H1ZM1 30.7367H0.9V31.1371H1H1.1V30.7367H1ZM1 31.5376H0.9V31.9381H1H1.1V31.5376H1ZM1 32.3386H0.9V32.7391H1H1.1V32.3386H1ZM1 33.1396H0.9V33.5401H1H1.1V33.1396H1ZM1 33.9406H0.9V34.341H1H1.1V33.9406H1ZM1 34.7415H0.9V35.142H1H1.1V34.7415H1ZM1 35.5425H0.9V35.943H1H1.1V35.5425H1ZM1 36.3435H0.9V36.744H1H1.1V36.3435H1ZM1 37.1444H0.9V37.5449H1H1.1V37.1444H1ZM1 37.9454H0.9V38.3459H1H1.1V37.9454H1ZM1 38.7464H0.9V39.1469H1H1.1V38.7464H1ZM1 39.5474H0.9V39.9478H1H1.1V39.5474H1ZM1 40.3483H0.9V40.7488H1H1.1V40.3483H1ZM1 41.1493H0.9V41.5498H1H1.1V41.1493H1ZM1 41.9503H0.9V42.3508H1H1.1V41.9503H1ZM1 42.7512H0.9V43.1517H1H1.1V42.7512H1ZM1 43.5522H0.9V43.9527H1H1.1V43.5522H1ZM1 44.3532H0.9V44.7537H1H1.1V44.3532H1ZM1 45.1542H0.9V45.5546H1H1.1V45.1542H1ZM1 45.9551H0.9V46.3556H1H1.1V45.9551H1ZM1 46.7561H0.9V47.1566H1H1.1V46.7561H1ZM1 47.5571H0.9V47.9576H1H1.1V47.5571H1ZM1 48.358H0.9V48.7585H1H1.1V48.358H1ZM1 49.159H0.9V49.5595H1H1.1V49.159H1ZM1 49.96H0.9V50.3605H1H1.1V49.96H1ZM1 50.761H0.9V51.1614H1H1.1V50.761H1ZM1 51.5619H0.9V51.9624H1H1.1V51.5619H1ZM1 52.3629H0.9V52.7634H1H1.1V52.3629H1ZM1 53.1639H0.9V53.5644H1H1.1V53.1639H1ZM1 53.9649H0.9V54.3653H1H1.1V53.9649H1ZM1 54.7658H0.9V55.1663H1H1.1V54.7658H1ZM1 55.5668H0.9V55.9673H1H1.1V55.5668H1ZM1 56.3678H0.9V56.7683H1H1.1V56.3678H1ZM1 57.1687H0.9V57.5692H1H1.1V57.1687H1ZM1 57.9697H0.9V58.3702H1H1.1V57.9697H1ZM1 58.7707H0.9V59.1712H1H1.1V58.7707H1ZM1 59.5717H0.9V59.9721H1H1.1V59.5717H1ZM1 60.3726H0.9V60.7731H1H1.1V60.3726H1ZM1 61.1736H0.9V61.5741H1H1.1V61.1736H1ZM1 61.9746H0.9V62.3751H1H1.1V61.9746H1ZM1 62.7755H0.9V63.176H1H1.1V62.7755H1ZM1 63.5765H0.9V63.977H1H1.1V63.5765H1ZM1 64.3775H0.9V64.778H1H1.1V64.3775H1ZM1 65.1785H0.9V65.5789H1H1.1V65.1785H1ZM1 65.9794H0.9V66.3799H1H1.1V65.9794H1ZM1 66.7804H0.9V67.1809H1H1.1V66.7804H1ZM1 67.5813H0.9V67.9818H1H1.1V67.5813H1ZM1 68.3823H0.9V68.7828H1H1.1V68.3823H1ZM1 69.1833H0.9V69.5838H1H1.1V69.1833H1ZM1 69.9842H0.9V70.3847H1H1.1V69.9842H1ZM1 70.7852H0.9V71.1857H1H1.1V70.7852H1ZM1 71.5862H0.9V71.9866H1H1.1V71.5862H1ZM1 72.3871H0.9V72.7876H1H1.1V72.3871H1ZM1 73.1881H0.9V73.5886H1H1.1V73.1881H1ZM1 73.9891H0.9V74.3895H1H1.1V73.9891H1ZM1 74.79H0.9V75.1905H1H1.1V74.79H1ZM1 75.591H0.9V75.9915H1H1.1V75.591H1ZM1 76.392H0.9V76.7924H1H1.1V76.392H1ZM1 77.1929H0.9V77.5934H1H1.1V77.1929H1ZM1 77.9939H0.9V78.3944H1H1.1V77.9939H1ZM1 78.7948H0.9V79.1953H1H1.1V78.7948H1ZM1 79.5958H0.9V79.9963H1H1.1V79.5958H1ZM1 80.3968H0.9V80.7973H1H1.1V80.3968H1ZM1 81.1977H0.9V81.5982H1H1.1V81.1977H1ZM1 81.9987H0.9V82.3992H1H1.1V81.9987H1ZM1 82.7997H0.9V83H1H1.1V82.7997H1Z" fill="white" />
              </svg>
            </div>
            <div className="opacity-80 justify-start text-white text-[10px] font-light font-['Fira_Code']">instant_inspiration.module[active]</div>
          </div>
        </div>

        {/* This is Section Three */}
        <div className='my-40 flex flex-col w-full'>
          <div className='my-40 flex flex-col w-full'>
            <div className='flex justify-between items-center'>
              <div className='flex justify-start items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="47" viewBox="0 0 46 47" fill="none">
                  <path d="M1.80397e-06 46.8142L2.26019e-06 36.3806L18.1883 36.3806L21.2678 39.472L30.9874 39.472L0.00385252 8.26786L7.41005 0.832965L38.4937 31.9367L38.4937 21.9861L35.4142 18.8947L35.4142 0.829101L46 0.829102L46 39.3754L38.59 46.8142L1.80397e-06 46.8142Z" fill="white" />
                </svg>
                <div className="justify-start text-white text-7xl font-light font-['Helvetica_Neue'] uppercase">RESOMIX BRINGS</div>
              </div>
              <div className="text-right justify-start text-white text-lg font-extralight font-['Auger_Mono_TEST']">The thrill and excitement of crate digging, but with the power,<br />speed, and convenience of cutting-edge technology.</div>
            </div>
            <div className="justify-start text-white text-7xl font-light font-['Helvetica_Neue'] uppercase">THE ART OF SELECTION<br />INTO THE AGE OF DEEP LEARNING</div>
          </div>
          <div className='my-40 flex justify-between items-center'>
            <div className="w-[734px] justify-start text-white text-4xl font-light font-['Montserrat'] uppercase">A safe haven for DJs escaping the<br />noise of algorithms and trends</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="44" viewBox="0 0 55 44" fill="none">
              <path d="M53.592 42.1365L53.592 43.3836C47.8816 43.3836 43.7645 37.9461 39.7735 32.6833C36.0191 27.7197 32.1228 22.594 27.3115 22.594L27.3115 21.3469C33.0219 21.3469 37.1391 26.7844 41.1301 32.0472C44.8845 36.9983 48.765 42.1365 53.592 42.1365Z" fill="white" stroke="white" />
              <path d="M53.592 31.7344L53.592 32.9816C48.0394 32.9816 43.9222 30.2628 39.947 27.6439C36.0033 25.0498 32.2805 22.593 27.3115 22.593L27.3115 21.3459C32.8642 21.3459 36.9814 24.0646 40.9566 26.6836C44.8845 29.2901 48.6073 31.7344 53.592 31.7344Z" fill="white" stroke="white" />
              <path d="M27.2969 21.3481L27.2969 22.5956L53.5932 22.5956L53.5932 21.3481L27.2969 21.3481Z" fill="white" stroke="white" />
              <path d="M53.592 10.9599L53.592 12.207C48.6073 12.207 44.8845 14.6639 40.9566 17.2579C36.9814 19.8893 32.8642 22.5956 27.3115 22.5956L27.3115 21.3485C32.2963 21.3485 36.0191 18.8916 39.947 16.2976C43.9222 13.6662 48.0394 10.9599 53.592 10.9599Z" fill="white" stroke="white" />
              <path d="M53.592 0.558884L53.592 1.80601C48.765 1.80601 44.8845 6.93168 41.1301 11.8952C37.1391 17.1581 33.0219 22.5956 27.3115 22.5956L27.3115 21.3485C32.1386 21.3485 36.0191 16.2228 39.7735 11.2592C43.7487 5.99636 47.8659 0.558885 53.592 0.558884Z" fill="white" stroke="white" />
              <path d="M27.2961 21.3485L27.2961 22.5956C21.5857 22.5956 17.4686 17.1581 13.4776 11.8952C9.72322 6.93168 5.82688 1.80601 1.01562 1.80601L1.01562 0.558886C6.72604 0.558885 10.8432 5.99636 14.8342 11.2592C18.5886 16.2228 22.4691 21.3485 27.2961 21.3485Z" fill="white" stroke="white" />
              <path d="M27.2961 21.3485L27.2961 22.5956C21.7435 22.5956 17.6263 19.8768 13.6511 17.2579C9.70744 14.6639 5.98463 12.207 1.01562 12.207L1.01562 10.9599C6.56829 10.9599 10.6855 13.6786 14.6607 16.2976C18.5886 18.8916 22.3114 21.3485 27.2961 21.3485Z" fill="white" stroke="white" />
              <path d="M1 21.3482L1 22.5957L27.2963 22.5957L27.2963 21.3482L1 21.3482Z" fill="white" stroke="white" />
              <path d="M27.2961 21.3462L27.2961 22.5934C22.3114 22.5934 18.5886 25.0502 14.6607 27.6442C10.6855 30.2757 6.56829 32.9819 1.01562 32.9819L1.01562 31.7348C6.00041 31.7348 9.72321 29.278 13.6511 26.684C17.6263 24.065 21.7435 21.3462 27.2961 21.3462Z" fill="white" stroke="white" />
              <path d="M27.2961 21.3469L27.2961 22.594C22.4691 22.594 18.5886 27.7197 14.8342 32.6833C10.8432 37.9461 6.72604 43.3836 1.01562 43.3836L1.01562 42.1365C5.84266 42.1365 9.72322 37.0108 13.4776 32.0472C17.4686 26.7844 21.5857 21.3469 27.2961 21.3469Z" fill="white" stroke="white" />
            </svg>
            <div className="w-[801px] text-right justify-start text-white text-4xl font-light font-['Montserrat'] uppercase">Resomix will expand your sonic<br />horizon, discover threads you never<br />knew were there.</div>
          </div>
        </div>

        {/* This is SectionFour */}
        <div className='my-20'>
          <div className='flex justify-between items-start'>
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <div className='flex items-center justify-start'>
                  <div className=''>
                    HOW
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none">
                    <path d="M65 64.5422H50.2521V39.245L54.6219 34.9619L54.6219 21.4432L10.5147 64.5369L0.00546335 54.236L43.9706 11.0031L29.9055 11.0031L25.5357 15.2862L0 15.2862L0 0.562988L54.4853 0.562988L65 10.8693L65 64.5422Z" fill="white" />
                  </svg>
                </div>
                <div className=''>
                  RESOMIX<br />WORKS
                </div>
              </div>
              <div className=''>
                <svg xmlns="http://www.w3.org/2000/svg" width="416" height="230" viewBox="0 0 416 230" fill="none">
                  <path d="M179.5 47H1V229.5H415V1H236.5L179.5 47Z" stroke="white" stroke-width="0.5" stroke-dasharray="1 1" />
                </svg>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-col items-start'>
                <div className='flex items-center justify-start gap-5'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <path d="M28 55C42.9117 55 55 42.9117 55 28C55 13.0883 42.9117 1 28 1C13.0883 1 1 13.0883 1 28C1 42.9117 13.0883 55 28 55Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                    <path d="M28.0002 47.472C38.7542 47.472 47.472 38.7542 47.472 28.0002C47.472 17.2462 38.7542 8.52832 28.0002 8.52832C17.2462 8.52832 8.52832 17.2462 8.52832 28.0002C8.52832 38.7542 17.2462 47.472 28.0002 47.472Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                    <path d="M27.9999 39.6545C34.4363 39.6545 39.654 34.4368 39.654 28.0003C39.654 21.5639 34.4363 16.3462 27.9999 16.3462C21.5634 16.3462 16.3457 21.5639 16.3457 28.0003C16.3457 34.4368 21.5634 39.6545 27.9999 39.6545Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                    <path d="M27.9997 31.9085C30.1585 31.9085 31.9085 30.1585 31.9085 27.9997C31.9085 25.8409 30.1585 24.0908 27.9997 24.0908C25.8409 24.0908 24.0908 25.8409 24.0908 27.9997C24.0908 30.1585 25.8409 31.9085 27.9997 31.9085Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                  </svg>
                  <div className=''>
                    1 — Upload Your Reference Track
                  </div>
                </div>
                <div className=''>
                  You can upload any audio file: a released or unreleased track, a sketch from your archive, or a short clip.Metadata is not important; Resomix listens to your reference audio and extrapolates its sonic DNA to find a perfect match.
                </div>
              </div>
              <div className=''>
                -------------------------
              </div>
              <div className='flex justify-between items-start'>
                <div className='flex flex-col justify-between gap-6 items-start'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="61" height="63" viewBox="0 0 61 63" fill="none">
                    <path d="M27.4605 3.81309C49.6097 1.71309 65.0927 24.9994 54.2403 44.566C43.6746 63.6237 15.3823 63.1435 5.77 43.5554C-2.6381 26.4186 8.3505 5.6264 27.4605 3.81309ZM46.083 41.2476C48.0256 39.3984 49.6957 26.9274 51.0147 23.4298C51.6669 21.7025 52.6991 20.5056 53.3443 18.9718C44.9863 2.58032 22.2422 0.229469 10.3217 14.2701C4.02817 21.681 2.04979 32.9479 6.56566 41.6848C8.39351 41.7063 10.8951 27.5868 11.5044 25.4868C12.1997 23.093 13.9846 16.9435 17.5184 19.9895C19.9412 22.0752 21.1526 31.8155 22.0486 35.1626C22.5002 36.854 23.898 43.1397 26.2993 41.3551C28.4855 39.7281 30.4782 25.9813 32.0122 22.3404C34.2128 17.1155 37.2449 18.9503 38.8003 23.4226C40.8791 29.3786 40.7644 36.1445 44.076 41.6203C44.4917 41.8639 45.7246 41.5701 46.0759 41.2332L46.083 41.2476ZM34.4063 20.6203C32.3921 21.7885 30.1413 36.811 28.6217 40.0936C27.6397 42.2151 25.7832 44.3581 23.5969 42.2366C21.1311 39.8428 19.8552 29.6581 18.7585 25.9312C17.9055 23.0284 16.049 17.2875 13.6477 22.9783C10.9023 29.4933 11.6621 37.5063 7.16777 43.2472C15.0239 58.3558 34.9367 62.1329 47.7962 50.6725C53.8532 45.2755 57.3942 36.4957 56.4695 28.368C56.3477 27.3288 54.9858 21.509 54.4338 21.0861C53.5665 20.4196 52.6848 22.5267 52.4554 23.0786C50.8498 27.0134 49.28 40.3373 46.7282 42.4373C45.6386 43.3261 44.1907 43.3476 43.1226 42.4302C40.8504 40.4807 39.596 31.3496 38.7645 28.1602C38.3989 26.7482 36.7789 19.2585 34.4135 20.6346L34.4063 20.6203Z" fill="white" />
                  </svg>
                  <div className=''>
                    2 — Deep Sonic Analysis
                  </div>
                  <div className=''>
                    Here’s when the magic happens.
                    Our system performs a full spectral analysis on a granular level, exploring every aspect of your tune: rhythm, harmonic content, energy flow, dynamics, and tonal balance.
                  </div>
                </div>
                <div className=''>
                  |<br />|<br />|<br />|<br />
                </div>
                <div className='flex flex-col justify-between gap-6 items-start'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="54" height="56" viewBox="0 0 54 56" fill="none">
                    <path d="M3.74414 14.3198L50.1841 41.6798" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                    <path d="M3.45605 41.104L50.6881 14.896" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                    <path d="M13.3203 4.74414L40.7523 51.3281" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                    <path d="M26.5684 1L27.4324 55" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                    <path d="M0 27.9277H54" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                    <path d="M14.6162 49.8163L39.0242 6.76025" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                    <path d="M38.6637 10.4323C40.3338 10.4323 41.6877 9.07839 41.6877 7.40828C41.6877 5.73817 40.3338 4.38428 38.6637 4.38428C36.9935 4.38428 35.6396 5.73817 35.6396 7.40828C35.6396 9.07839 36.9935 10.4323 38.6637 10.4323Z" fill="white" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                    <path d="M15.3355 51.5436C17.0056 51.5436 18.3595 50.1897 18.3595 48.5196C18.3595 46.8495 17.0056 45.4956 15.3355 45.4956C13.6654 45.4956 12.3115 46.8495 12.3115 48.5196C12.3115 50.1897 13.6654 51.5436 15.3355 51.5436Z" fill="white" stroke="white" stroke-width="1.5" stroke-miterlimit="10" />
                  </svg>
                  <div className=''>
                    3 — Get Perfect Matches
                  </div>
                  <div className=''>
                    Within seconds, you’ll have a carefully crafted selection of tracks that resonate with your reference’s vibe, regardless of genre, release date, or popularity.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* This is Section Five */}
        <div className=''>
          
        </div>
      </div>
    );
  }
}

export default NewApp;
