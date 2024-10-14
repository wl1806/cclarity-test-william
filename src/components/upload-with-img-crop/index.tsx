/* eslint-disable no-async-promise-executor */
import { RotateLeftOutlined, RotateRightOutlined } from '@ant-design/icons'
import { Col, message, Modal, Row, Slider } from 'antd'
import { Upload } from 'antd'
import { RcFile } from 'antd/lib/upload'
import { ShowUploadListInterface, UploadProps } from 'antd/lib/upload/interface'
import canvasSize from 'canvas-size'
import Compressor from 'compressorjs'
import React, { CSSProperties, useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Point } from 'react-easy-crop/types'

import TEXTS from '../../constants/translation-copy'
import Common, { Base64ToFile } from '../../utils/common'
import T from '../../utils/translation'
import { getCroppedImg, getImageDimensions } from './canvas-utils'

export function readFile(file, maxDimResize?: number) {
  return new Promise(async (resolve) => {
    let finalFile
    if (maxDimResize) {
      const compress = await new Promise((resolve, reject) => {
        new Compressor(file, {
          maxHeight: maxDimResize,
          maxWidth: maxDimResize,
          success: resolve,
          error: reject
        })
      })
      // @ts-ignore
      finalFile = compress
    } else {
      finalFile = file
    }
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(finalFile)
  })
}
export const blobToFile = (theBlob: Blob, fileName: string): File => {
  var b: any = theBlob
  b.lastModifiedDate = new Date()
  b.name = fileName

  return theBlob as File
}
const MAX_ROTATION = 360
const MIN_ROTATION = 0
const UploadWithImgCrop = ({
  useZoom,
  useRotate,
  setData,
  children,
  accept,
  maxCount,
  name,
  action,
  showUploadList,
  aspect = 4 / 3,
  rotateStep = 1,
  beforeCrop,
  uploadClassName,
  uploadRef,
  uploadStyle,
  byteSize,
  maxDimResize,
  language,
  useCrop
}: {
  useZoom?: boolean
  useRotate?: boolean
  rotateStep?: number
  setData: (e: any) => void
  children: React.ReactNode
  accept?: string
  maxCount?: number
  name: string
  action?:
    | string
    | ((file: RcFile) => string)
    | ((file: RcFile) => PromiseLike<string>)
  showUploadList?: boolean | ShowUploadListInterface
  aspect?: number
  beforeCrop?: (file) => boolean
  uploadClassName?: string
  uploadStyle?: CSSProperties
  uploadRef?: React.RefObject<UploadProps<any>>
  byteSize?: number
  maxDimResize?: number
  language: string
  useCrop?: boolean
}) => {
  const [rotation, setRotation] = useState(0)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [cropSize, setCropSize] = useState({ width: 82, height: 82 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [imgUrl, setImgUrl] = React.useState<string>('')
  const [imageCropVisible, setImageCropVisible] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [fileToUpload, setFile] = React.useState<RcFile>()

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  return (
    <>
      <Upload
        className={uploadClassName}
        ref={uploadRef}
        style={uploadStyle}
        accept={accept}
        maxCount={maxCount}
        name={name}
        action={action}
        showUploadList={showUploadList}
        beforeUpload={async (file: RcFile) => {
          setFile(file)
          if (beforeCrop && !(await beforeCrop(file))) {
            return false
          }
          Common.BeforeUpload(
            file,
            byteSize || 2,
            async (valid) => {
              const isMobile =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                )
              const maxCanvasSize = await canvasSize.maxArea({
                max: isMobile ? 4096 : null,
                usePromise: true,
                useWorker: false
              })
              const imgDim: any = await getImageDimensions(file)

              const maxImageDimension = Math.floor(
                Math.max(maxCanvasSize.width, maxCanvasSize.height) /
                  Math.sqrt(2)
              )
              const imageDataUrl = await readFile(
                file,
                !valid ||
                  imgDim.height > maxImageDimension ||
                  imgDim.width > maxImageDimension
                  ? maxDimResize
                  : undefined
              )
              const base64str = (imageDataUrl as string).split('base64,')[1]
              const decoded = atob(base64str)
              const sizeInMB = Math.ceil((decoded.length * 0.75) / 1048576)
              if (sizeInMB <= (byteSize || 2)) {
                if (useCrop) {
                  setImgUrl(imageDataUrl as string)
                  setImageCropVisible(true)
                } else {
                  Base64ToFile(
                    imageDataUrl as string,
                    file?.name || 'file-upload'
                  ).then((res) => {
                    setData(res)
                  })
                }
              } else {
                message.error(
                  T(TEXTS.MAX_SIZE_IMAGE, { locale: language, size: byteSize })
                )
                return false
              }
            },
            false
          )
          return false
        }}
      >
        {children}
      </Upload>
      <Modal
        className='image-crop-modal'
        onCancel={() => setImageCropVisible(false)}
        confirmLoading={isLoading}
        onOk={async () => {
          try {
            setIsLoading(true)
            let returnfile
            const croppedImage: any = await getCroppedImg(
              imgUrl,
              croppedAreaPixels,
              rotation
            )

            if (croppedImage.size / 1048576 > (byteSize || 2)) {
              const imageDataUrl = await readFile(croppedImage, maxDimResize)

              await Base64ToFile(imageDataUrl as string, 'file').then(
                (res) => (returnfile = res)
              )
            } else {
              returnfile = blobToFile(
                croppedImage as Blob,
                fileToUpload?.name || 'file-to-upload'
              )
            }
            setData(returnfile)
          } catch (e) {
            console.error('Error on cropping image', e)
          }
          setIsLoading(false)
          setImageCropVisible(false)
        }}
        visible={imageCropVisible}
        centered
      >
        <div className='image-crop-container'>
          <Cropper
            image={imgUrl}
            crop={crop}
            cropSize={cropSize}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onMediaLoaded={(mediaSize) => {
              if (mediaSize.width > mediaSize.height * aspect) {
                setCropSize({
                  width: mediaSize.height * aspect,
                  height: mediaSize.height
                })
              } else {
                setCropSize({
                  width: mediaSize.width,
                  height: mediaSize.width / aspect
                })
              }
            }}
            onZoomChange={setZoom}
            rotation={rotation}
            onRotationChange={setRotation}
          />
        </div>
        <div>
          {useZoom ? (
            <div className='image-crop-slider'>
              <p>Zoom</p>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby='Zoom'
                onChange={(zoom) => setZoom(Number(zoom))}
              />
            </div>
          ) : (
            <></>
          )}
          {useRotate ? (
            <>
              <div className='image-crop-slider'>
                <p>Rotate</p>
                <Slider
                  value={rotation}
                  min={MIN_ROTATION}
                  max={MAX_ROTATION}
                  step={1}
                  aria-labelledby='Rotation'
                  className='image-crop-slider'
                  onChange={(rotation) => setRotation(rotation)}
                />
              </div>
              <Row style={{ justifyContent: 'space-evenly' }}>
                <Col
                  className='use-pointer'
                  onClick={() => {
                    let newRotation = rotation - rotateStep
                    if (newRotation < MIN_ROTATION) {
                      newRotation += MAX_ROTATION
                    }
                    setRotation(newRotation)
                  }}
                >
                  <RotateLeftOutlined style={{ fontSize: '24px' }} />
                </Col>
                <Col
                  className='use-pointer'
                  onClick={() => {
                    let newRotation = rotation + rotateStep
                    if (newRotation > MAX_ROTATION) {
                      newRotation -= MAX_ROTATION
                    }
                    setRotation(newRotation)
                  }}
                >
                  <RotateRightOutlined style={{ fontSize: '24px' }} />
                </Col>
              </Row>
            </>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </>
  )
}

export default UploadWithImgCrop
