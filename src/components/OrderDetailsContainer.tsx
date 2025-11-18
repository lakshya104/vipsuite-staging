'use client';
import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { filter, first, isEmpty, map } from 'lodash';
import he from 'he';
import FeedbackForm from '@/features/FeedbackForm';
import { formatDate, formatString, isNonEmptyString } from '@/helpers/utils';
import OrderItem from './OrderItem';
import { Order } from '@/interfaces';
import { DefaultImageFallback, QuestionType } from '@/helpers/enums';
import en from '@/helpers/lang';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Question } from '@/interfaces/events';

interface OrderDetailsContainerProps {
  orderDetail: Order;
}

const OrderDetailsContainer: React.FC<OrderDetailsContainerProps> = ({ orderDetail }) => {
  const orderTypeMetadata = orderDetail?.meta_data.find((item) => item.key === 'type_of_order')?.value;
  const orderType = orderTypeMetadata === 'rsvp_request' ? 'event' : 'order';
  const orderStatus =
    orderTypeMetadata === 'rsvp_request' ? 'rsvp' : orderTypeMetadata === 'lookbook_order' ? 'lookbook' : 'product';
  const isInterested =
    orderTypeMetadata === 'rsvp_request'
      ? orderDetail?.meta_data.find((item) => item.key === 'response')?.value === 'interested'
      : true;
  const response = orderDetail?.meta_data.find((item) => item.key === 'response')?.value;
  const brandName = orderDetail?.meta_data.find((item) => item.key === 'brand_name')?.value;
  const isRelatedOpportunity = orderType === 'order' && !isEmpty(orderDetail?.line_items);
  const showList =
    orderStatus === 'rsvp' ||
    orderStatus === 'lookbook' ||
    (orderStatus === 'product' && isEmpty(orderDetail?.line_items));

  const formatAnswer = (q: Question): { title: string; answer: string; type?: string } | null => {
    if (!q.answer) return null;

    switch (q.input_type) {
      case QuestionType.Date:
        return {
          title: q.title,
          answer: dayjs(q.answer).format('DD/MM/YYYY'),
        };

      case QuestionType.DateTime:
        return {
          title: q.title,
          answer: dayjs(q.answer).format('DD/MM/YYYY HH:mm'),
        };

      case QuestionType.CheckBoxes:
        return {
          title: q.title,
          answer: Array.isArray(q.answer) ? q.answer.join(', ') : q.answer,
        };

      case QuestionType.FileUpload:
        return { title: q.title, answer: q.answer, type: QuestionType.FileUpload };

      default:
        return {
          title: q.title,
          answer: typeof q.answer === 'string' ? q.answer.trim() : q.answer,
        };
    }
  };
  const formattedResponse = orderDetail?.questions && map(orderDetail.questions, (q: Question) => formatAnswer(q));

  return (
    <>
      <Box my={2.5}>
        {orderStatus === 'rsvp' ? (
          <>
            <Typography variant="body1">
              {en.myOrders.rsvpDate} {formatDate(orderDetail?.date_created)}
            </Typography>
            <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
              {response}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body1">
              {en.myOrders.orderDate}
              {formatDate(orderDetail?.date_created)}
            </Typography>
            <Typography variant="body1">
              {en.myOrders.status} {formatString(orderDetail?.status)}
            </Typography>
          </>
        )}
        {orderDetail?.tracking_url && (
          <Typography variant="body1">
            {en.myOrders.trackOrder}{' '}
            <Link
              href={orderDetail?.tracking_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline' }}
            >
              {en.myOrders.clickHere}
            </Link>
          </Typography>
        )}
      </Box>
      <Box className="order-product__items">
        {orderStatus !== 'lookbook' &&
          orderStatus !== 'rsvp' &&
          orderDetail?.line_items.map((item) => (
            <OrderItem
              key={item?.id}
              item={item}
              isRelatedOpportunity={isRelatedOpportunity}
              title={he.decode(orderDetail?.opportunity?.title || '')}
              createdFor={orderDetail?.order_created_for}
              brandName={brandName || item?.brand_name}
            />
          ))}
        {showList && (
          <Box className="order-product__item" display={'flex'}>
            <Image
              height={110}
              width={110}
              src={orderDetail?.opportunity?.image?.sizes?.medium || DefaultImageFallback.Placeholder}
              alt={he.decode(orderDetail?.opportunity?.title || 'product-image')}
            />
            <Box>
              <Typography gutterBottom variant="h2">
                {he.decode(orderDetail?.opportunity?.title || '')}
              </Typography>
              {brandName && <Typography variant="body1">{brandName}</Typography>}
              {(orderDetail?.opportunity?.start_date || orderDetail?.opportunity?.end_date) && (
                <Typography variant="body1">
                  <Typography component="span">Date: </Typography>
                  <>
                    {orderDetail?.opportunity?.start_date && orderDetail.opportunity.start_date}
                    {orderDetail?.opportunity?.start_date && orderDetail?.opportunity?.end_date && ' - '}
                    {orderDetail?.opportunity?.end_date && orderDetail.opportunity.end_date}
                  </>
                </Typography>
              )}
              {orderDetail?.opportunity?.location && orderDetail.opportunity.location.trim() !== '' && (
                <Typography variant="body1">
                  {en.myOrders.location} {orderDetail.opportunity.location}
                </Typography>
              )}
              {orderStatus === 'lookbook' && (
                <Typography variant="body1">
                  {en.myOrders.description}{' '}
                  {first(filter(orderDetail?.meta_data, (item) => item.key === 'lookbook_order_data'))?.value}
                </Typography>
              )}
              {isNonEmptyString(orderDetail?.order_created_for) && (
                <Typography gutterBottom variant="body1">
                  {en.myOrders.orderedFor} {orderDetail?.order_created_for}
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
      {!isEmpty(formattedResponse) && (
        <Box mb={5}>
          <Typography gutterBottom variant="h3">
            {en.myOrders.yourResponse}
          </Typography>
          {map(formattedResponse, (res, index) => {
            return (
              <Box key={index} my={2}>
                <Typography fontWeight={600} fontSize={'16px'}>
                  {res?.title}
                </Typography>
                {res?.type && res.type === QuestionType.FileUpload ? (
                  <Typography sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                    <Link
                      href={res.answer}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'underline', wordBreak: 'break-word' }}
                    >
                      {res.answer}
                    </Link>
                  </Typography>
                ) : (
                  <Typography sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{res?.answer}</Typography>
                )}
              </Box>
            );
          })}
        </Box>
      )}
      {!orderDetail?.is_feedback_provided && isInterested && (
        <FeedbackForm type={orderType} orderId={orderDetail?.id} />
      )}
    </>
  );
};

export default OrderDetailsContainer;
