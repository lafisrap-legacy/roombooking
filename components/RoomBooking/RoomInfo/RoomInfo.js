/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint comma-dangle: [2, "never"] */

import React, { PropTypes } from 'react';
import { isEmpty } from 'lodash';
import cx from 'classnames';

import { API_BASE_URL } from '../../../src/actions';
import Link from '../../Link';
import BookingSchedule from '../BookingSchedule';

import s from './RoomInfo.css';

const RoomInfo = ({ index, room }) => {
  if (isEmpty(room)) return <div className="spinner" />;

  return (
    <div className="card">
      <div className="card-header" role="tab" id={`RoomInfo__cardHeader${index}`}>
        <h5 className="mb-0">
          <a
            data-toggle="collapse"
            data-parent="#roombooking__roomlist"
            href={`#RoomInfo__collapse${index}`}
            aria-expanded="true"
            aria-controls={`RoomInfo__collapse${index}`}
            className={cx(s.roomHeader)}
          >
            <div className="row">
              <div className="col-lg-4 col-xs-12">
                <span className={cx(s.headerItem, s.roomName)}>{room.name}</span>
                <br />
                <span className={cx(s.headerItem, s.roomCapacity)}>
                  Capacity: {room.capacity}
                </span>
                <span className={cx(s.headerItem, s.roomSize)}>{room.size}</span>
              </div>
              <div className="col-lg-8 col-xs-12">
                <BookingSchedule avail={room.avail} />
              </div>
            </div>
          </a>
        </h5>
      </div>

      <div id={`RoomInfo__collapse${index}`} className="collapse" role="tabpanel" aria-labelledby={`room ${index}`}>
        <div className="card-block">
          <div className="row">
            <div className="col-lg-9 col-xs-12">
              <div className={cx(s.headerItem, s.roomName)}>Location</div>
              <div className={cx(s.headerItem)}>{room.location}</div>
              <div className={cx(s.headerItem, s.roomName)}>Equipment</div>
              <div className={cx(s.headerItem)}>{room.equipment.join(', ')}</div>
              <button className={cx('btn', 'btn-success', 'float-left', s.headerItem, s.roomButton)}>
                <Link to={`/bookroom?room=${room.name}`}>Book</Link>
              </button>
            </div>
            <div className="col-lg-3 col-xs-12">
              {room.images.map(image =>
                <img
                  key={image}
                  src={`${API_BASE_URL}/${image}`}
                  className={cx('img', 'img-fluid', s.roomImage)}
                  alt="room"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RoomInfo.propTypes = {
  room: PropTypes.shape({
    avail: PropTypes.arrayOf(PropTypes.string),
    capacity: PropTypes.number,
    equipment: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.string
  }).isRequired,
  index: PropTypes.number
};


export default RoomInfo;
