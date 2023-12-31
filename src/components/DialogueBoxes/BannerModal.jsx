import { Dialog, DialogBody,  DialogFooter, Input, Button } from '@material-tailwind/react';
import React from 'react'

function BannerModal({open,setImage,image, banner,deleteBanner, setBanner, action}) {
  return (
    <div>
         <Dialog size='sm' open={open} >
        <DialogBody className='flex-col space-y-5 m-9 '>
         
            <Input
            name='image'
            className=""
            type="file"
            label="image"
            accept="image/*"
            onChange={(e)=>{setImage(e.target.files[0])}}
            />
            
            
            
            <Input
            name='index'
            className=""
            type="number"
            label="order"
            value={banner?.index && banner.index}
            onChange={(e)=>{setBanner({...banner, [e.target.name]: e.target.value})}}
            />
            <Input
            name='headline'
            className=""
            type="text"
            label="headline"
            value={banner?.headline && banner.headline}
            onChange={(e)=>{setBanner({...banner, [e.target.name]: e.target.value})}}
            />
            <Input
            name='description'
            className=""
            type="text"
            label="description"
            value={banner?.description && banner.description}
            onChange={(e)=>{setBanner({...banner, [e.target.name]: e.target.value})}}
            />
        </DialogBody>
        <DialogFooter>
          <div className='w-full'>
          {deleteBanner !=null &&
          <Button
            variant="text"
            color="red"
            className="float-left"
            onClick={()=>{deleteBanner(); open();}}
          >
            <span>Remove Banner</span>
          </Button>}

          <Button
            variant="text"
            color="red"
            className="ml-28"
            onClick={()=>open()}
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={()=>{ action();  open() }}>
            <span>Upload</span>
          </Button>
          </div>
        </DialogFooter>

      </Dialog>
      
    </div>
  )
}

export default BannerModal
