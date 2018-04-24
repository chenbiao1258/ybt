prompt PL/SQL Developer import file
prompt Created on 2018年4月20日 by chen
set feedback off
set define off
prompt Dropping ELEMENTSOFCONTROL...
drop table ELEMENTSOFCONTROL cascade constraints;
prompt Dropping FORMELEMENT...
drop table FORMELEMENT cascade constraints;
prompt Creating ELEMENTSOFCONTROL...
create table ELEMENTSOFCONTROL
(
  sid               VARCHAR2(50) not null,
  id                VARCHAR2(50) not null,
  defaultvalue      VARCHAR2(2),
  validitem         VARCHAR2(10),
  relateobjectfield VARCHAR2(20),
  comorder          INTEGER,
  elementstatus     VARCHAR2(2),
  combinedid        VARCHAR2(20)
)
;
alter table ELEMENTSOFCONTROL
  add primary key (ID, SID);

prompt Creating FORMELEMENT...
create table FORMELEMENT
(
  sid                VARCHAR2(50) not null,
  id                 VARCHAR2(50) not null,
  name               VARCHAR2(50),
  text               VARCHAR2(2000),
  type               VARCHAR2(20),
  englishtext        VARCHAR2(2000),
  checkboxoption     VARCHAR2(100),
  cssclass           VARCHAR2(50),
  groupid            VARCHAR2(50),
  parentid           VARCHAR2(50),
  noticeelementgroup VARCHAR2(50)
)
;
alter table FORMELEMENT
  add primary key (ID, SID);

prompt Loading ELEMENTSOFCONTROL...
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('trancert', 'liveheath', null, null, null, 6, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('trancert', 'tiveheath', null, null, null, 7, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('trancert', 'livingaddress', null, null, null, 8, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('trancert', 'cnnativeheath', null, null, null, 9, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('trancert', 'ennativeheath', null, null, null, 10, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('trancert', 'reason1', null, null, null, 11, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('trancert', 'reason2desc', null, null, null, 12, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'riskName', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'dated', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'insuReason', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select122', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'diseases', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'hospital', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'TimeOfIllness', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'condition', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select123', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select124', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select1', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select2', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select106', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select107', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select108', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select109', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'InsuHight', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'AppHeight', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'InsuWeight', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'AppWeight', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select3', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select110', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'patient', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'etiology', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select111', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select112', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select113', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select114', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice1', 'Y', null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice2', 'N', null, null, 2, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice3', 'Y', null, null, 3, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice4', 'Y', null, null, 4, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice5', 'Y', null, null, 5, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice6', 'Y', null, null, 6, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'cityname', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'companyCode', null, null, null, 2, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'insurancecom', null, null, null, 3, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'proposalcontno', null, null, null, 4, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'agentcode', null, null, null, 5, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'agentname', null, null, null, 6, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'polapplydate', null, null, null, 7, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'getpolmode', null, null, null, 8, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'newbankaccno', null, null, null, 9, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'accountbalance', null, null, null, 10, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'anotherHolderName', null, null, null, 11, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'anotherHolderIdType', null, null, null, 12, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'anotherHolderIdNo', null, null, null, 13, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lccont', 'grpcontno', null, null, null, 14, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'appntidenddate', null, null, null, 5, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'Responsibility', null, null, null, 13, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'postalProvince', null, null, null, 18, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'homeProvince', null, null, null, 24, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'GoalType', null, null, null, 29, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'beneIsTrue', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'beneSort', null, null, null, 2, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'benePart', null, null, null, 3, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'beneName', null, null, null, 4, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'beneSex', null, null, null, 5, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'beneBirth', null, null, null, 6, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'beneIdCard', null, null, null, 7, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'beneIdNumber', null, null, null, 8, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('krisk', 'DividendOption', null, null, null, 9, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('krisk', 'APLOption', null, null, null, 10, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('submit', 'DelayedDate', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'postalArea', null, null, null, 20, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'postalCity', null, null, null, 19, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'homeArea', null, null, null, 26, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'homeCity', null, null, null, 25, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('tracert', 'statement', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('tracert', 'labelstatement', null, null, null, 2, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('tracert', 'desc', null, null, null, 3, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('tracert', 'lastname', null, null, null, 5, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('tracert', 'firstname', null, null, null, 4, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'appntname', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'postaladdress', null, null, null, 21, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'homeaddress', null, null, null, 27, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'postalflag', null, null, null, 23, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('trancert', 'statement', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('trancert', 'labelstatement', null, null, null, 2, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('trancert', 'desc', null, null, null, 3, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('trancert', 'lastname', null, null, null, 5, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('trancert', 'firstname', null, null, null, 4, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'bnfofinsu', null, null, null, 0, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf_relationtoinsured', 'relationtoinsured', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf_relationtoinsured', 'relationtoinsured2', null, null, null, 2, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'relationtoappnt1', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'lcinsuredname1', null, null, null, 3, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'lcinsuredidtype1', null, null, null, 4, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'lcinsuredidno1', null, null, null, 5, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'lcinsuredsex1', null, null, null, 6, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'insureidenddate1', null, null, null, 7, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'lcinsuredbirthday1', null, null, null, 8, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'lcinsurednativeplace1', null, null, null, 9, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'lcinsuredroccupationcode1', null, null, null, 10, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'lcinsuredcompany1', null, null, null, 11, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'mobile1', null, null, null, 12, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'phone1', null, null, null, 13, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'email1', null, null, null, 14, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'rgtaddress1', null, null, null, 15, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'postaladdress1', null, null, null, 16, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsuredtwo', 'zipcode1', null, null, null, 17, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('newContApply', 'grpcontno', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('newContApply', 'insurancecom', null, null, null, 2, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('newContApply', 'riskcode', null, null, null, 3, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'idtype', null, null, null, 2, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'idno', null, null, null, 3, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'appntsex', null, null, null, 4, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'appntenddate', null, null, null, 5, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'appntbirthday', null, null, null, 6, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'nativeplace', null, null, null, 7, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'rgtaddress', null, null, null, 8, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'salary', null, null, null, 9, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'premiumBudget', null, null, null, 10, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'occupationcode', null, null, null, 11, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'company', null, null, null, 12, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'responsibility', null, null, null, 13, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'mobile', null, null, null, 14, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'email', null, null, null, 15, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'phone', null, null, null, 16, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'creditgrade', null, null, null, 17, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'zipcode', null, null, null, 22, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'homezipcode', null, null, null, 28, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcappnt', 'goaltype', null, null, null, 29, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'relationtoappnt', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'lcinsuredname', null, null, null, 3, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'lcinsuredidtype', null, null, null, 4, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'lcinsuredidno', null, null, null, 5, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'lcinsuredsex', null, null, null, 6, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'insureidenddate', null, null, null, 7, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'lcinsuredbirthday', null, null, null, 8, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'lcinsurednativeplace', null, null, null, 9, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'lcinsuredroccupationcode', null, null, null, 10, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'lcinsuredcompany', null, null, null, 11, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'mobile', null, null, null, 12, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'phone', null, null, null, 13, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'email', null, null, null, 14, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'rgtaddress', null, null, null, 15, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'postaladdress', null, null, null, 16, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcinsured', 'zipcode', null, null, null, 17, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'getform', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'bnfno', null, null, null, 2, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'bnflot', null, null, null, 3, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'name', null, null, null, 4, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'sex', null, null, null, 5, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'birthday', null, null, null, 6, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'idtype', null, null, null, 7, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'idno', null, null, null, 8, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('lcbnf', 'relationtoinsured', null, null, null, 9, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('krisk', 'riskcode', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('krisk', 'prem', null, null, null, 2, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('krisk', 'amnt', null, null, null, 3, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('krisk', 'mult', null, null, null, 4, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('krisk', 'insuyears', null, null, null, 5, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('krisk', 'payendyears', null, null, null, 6, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('krisk', 'getform', null, null, null, 7, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('krisk', 'payintv', null, null, null, 8, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('krisk', 'bonusgetmode', null, null, null, 9, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('frisk', 'riskcode', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('frisk', 'prem', null, null, null, 2, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('frisk', 'amnt', null, null, null, 3, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('frisk', 'mult', null, null, null, 4, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('frisk', 'insuyear', null, null, null, 5, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('frisk', 'payendyear', null, null, null, 6, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('frisk', 'getform', null, null, null, 7, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('frisk', 'payintv', null, null, null, 8, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('submit', 'delayedDate', null, null, null, 1, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice7', 'Y', null, null, 7, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice8', 'Y', null, null, 8, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice9', 'Y', null, null, 9, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice10', 'Y', null, null, 10, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice11', 'Y', null, null, 11, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice12', 'Y', null, null, 12, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice13', 'Y', null, null, 13, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice14', 'Y', null, null, 14, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice15', 'Y', null, null, 15, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'notice16', 'Y', null, null, 16, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select115', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select116', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select117', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select118', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'isPregnant', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'PregnantTime', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select119', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select120', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select4', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select5', 'Y', null, null, null, null, null);
insert into ELEMENTSOFCONTROL (sid, id, defaultvalue, validitem, relateobjectfield, comorder, elementstatus, combinedid)
values ('notice', 'select121', 'Y', null, null, null, null, null);
prompt 194 records loaded
prompt Loading FORMELEMENT...
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'postaladdress1', 'postaladdress1', '居住地址', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'zipcode1', 'zipcode1', '邮政编码', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'relationtoappnt1', 'relationtoappnt1', '投保人与被保人关系', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'lcinsuredname1', 'lcinsuredname1', '姓名', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'lcinsuredidtype1', 'lcinsuredidtype1', '证件类型', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'rgtaddress', 'rgtaddress', '个人年收入(万元)', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'postaladdress', 'postaladdress', '居住地址', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'zipcode', 'zipcode', '邮政编码', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcbnf_relationtoinsured', 'relationtoinsured2', 'relationtoinsured2', '与被保人的关系', 'combobox', null, null, null, 'bnf', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcbnf', 'bnfofinsu', 'bnfofinsu', '受益人所属被保人', 'checkbox', null, 'bnfinsu', null, 'bnf', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'rgtaddress1', 'rgtaddress1', '个人年收入(万元)', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'lcinsuredidno1', 'lcinsuredidno1', '证件号码', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'lcinsuredsex1', 'lcinsuredsex1', '性别', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'insureidenddate1', 'insureidenddate1', '证件有效止期', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'lcinsuredbirthday1', 'lcinsuredbirthday1', '出生日期', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'lcinsurednativeplace1', 'lcinsurednativeplace1', '国籍', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'lcinsuredroccupationcode1', 'lcinsuredroccupationcode1', '职业代码', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'lcinsuredcompany1', 'lcinsuredcompany1', '工作单位及名称', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'mobile1', 'mobile1', '移动电话', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'phone1', 'phone1', '家庭电话', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsuredtwo', 'email1', 'email1', 'E-mail', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('trancert', 'liveheath', 'liveheath', '同投保人居住地址（境外地址可不填此项）', 'combobox', null, null, null, 'taxrevenue', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('trancert', 'tiveheath', 'tiveheath', '同投保人居住地址（境外地址可不填此项）', 'combobox', null, null, null, 'taxrevenue', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('trancert', 'livingaddress', 'livingaddress', '现居地址（中文及英文）', 'combobox', null, null, null, 'taxrevenue', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('trancert', 'cnnativeheath', 'cnnativeheath', '出生地（中文或英文）', 'combobox', null, null, null, 'taxrevenue', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('trancert', 'ennativeheath', 'ennativeheath', '出生地英文在中文下面', 'combobox', null, null, null, 'taxrevenue', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('trancert', 'reason1', 'reason1', '如不能提供居民国（地区）纳税人识别号，请选择原因', 'combobox', null, null, null, 'taxrevenue', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('trancert', 'reason2desc', 'reason2desc', '多选框', 'combobox', null, null, null, 'taxrevenue', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice7', 'notice7', '过去或现在是否患有下列“注一”之疾病，或曾因受伤或生病住院治疗或手术治疗七天以上？', null, 'n the' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'past or at present, did/do you suffer from the diseases listed below' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'as “Note 1”? Or have you been in hospital for more than 7 days because' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'of illness or injury?', null, 'notice7', 'noticeinfos', 'notice7', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select115', 'select115', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice7', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select116', 'select116', '投保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice7', 'appntquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice8', 'notice8', '过去二年内是否曾患有下列“注二”之疾病？', null, 'In the past two year,' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'did you suffer from the diseases listed below as “Note 2”?', null, 'notice8', 'noticeinfos', 'notice8', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select117', 'select117', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice8', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select118', 'select118', '投保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice8', 'appntquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'isPregnant', 'isPregnant', '是否怀孕', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice8', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'PregnantTime', 'PregnantTime', '怀孕（周）', null, null, null, null, 'noticeinfos', 'notice8', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice9', 'notice9', '被保险人投保年龄<=12周岁以下时，且您申请购买住院补贴健康保险，请补充告知：', null, 'If the insured is younger than age 12 and applies Hospital Income' || chr(10) || '   ' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'rider, please answer the following questions:', null, 'notice9', 'noticeinfos', 'notice9', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice10', 'notice10', '被保险人出生时是否难产或早产或有窒息史、抢救史或置于保温箱史？', null, 'Was the insured' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'dystocia or premature delivery? Or did he (or she) have a history' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'of asphyxia, emergency treatment or infant-incubation when he (or she)' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'was born?', null, 'notice10', 'noticeinfos', 'notice10', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select119', 'select119', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice10', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice11', 'notice11', '被保险人是否被告知患有先天性疾病、遗传性疾病、先天性畸形或缺陷或曾因此接受治疗？', null, 'Does' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'the insured have congenital disease, genetic disease, congenital' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'abnormalities or impairment? Or had he (or she) been treated due' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'to the above diseases?', null, 'notice11', 'noticeinfos', 'notice11', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select120', 'select120', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice11', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice12', 'notice12', '已购买或正在申请投保其他保险公司的产品是否超过以下保额？寿险产品总保额300万、意外险产品总保额100万、重大疾病险产品总保额50万。', null, 'Does the' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'accumulative total coverage amount, which you already have or are applying for other company’s insurance, exceed 3' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'million life insurance、1 million accident insurance、or half million critical illness insurance?', null, 'notice12', 'noticeinfos', 'notice12', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select4', 'select4', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice12', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice13', 'notice13', '任何被保险人投保的人寿保险、意外或健康保险是否曾被拒保、延迟承保、加费承保、部分保险责任限制或降低保额承保？', null, 'Have the insured ever had other insurance applications declined, postponed, accepted' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || ' with extra premium or modified terms?', null, 'notice13', 'noticeinfos', 'notice13', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select5', 'select5', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice13', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select121', 'select121', '投保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice13', 'appntquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'riskName', 'riskName', '保险品种', null, null, null, null, 'noticeinfos', 'notice13', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'dated', 'dated', '保险日期', null, null, null, null, 'noticeinfos', 'notice13', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'insuReason', 'insuReason', '原因', null, null, null, null, 'noticeinfos', 'notice13', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice14', 'notice14', '您的保费额度是否大于或等于投保人保费预算的150%？', null, 'Your premium amount is greater than or equal to 150% of policyholder’s budget?', null, 'notice14', 'noticeinfos', 'notice14', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select122', 'select122', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice14', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice15', 'notice15', '上述告知栏中若有回答为“是”者，请在本栏具体说明：', null, 'If the answer is “Yes” for the above questions in part IV, please give the details as follows:', null, 'notice15', 'noticeinfos', 'notice15', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'diseases', 'diseases', '疾病名称', null, null, null, null, 'noticeinfos', 'notice15', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'hospital', 'hospital', '医院名称', null, null, null, null, 'noticeinfos', 'notice15', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'TimeOfIllness', 'TimeOfIllness', '患病时间', null, null, null, null, 'noticeinfos', 'notice15', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'condition', 'condition', '目前情况', null, null, null, null, 'noticeinfos', 'notice15', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice16', 'notice16', 'FATCA 告知事项 FATCA Details (请投保人告知您本人是否存在以下美国身份表征,如您本人符合以下任何一种情况,则请勾选“是”,如申请年金保险,请被保险人同时完成本项告知)', null, null, null, 'notice16', 'noticeinfos', 'notice16', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select123', 'select123', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice16', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select124', 'select124', '投保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice16', 'appntquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select001', 'select001', '被保人1', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice1', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice1', 'notice1', '您是否计划未来一年内前往国外定居或工作或自助旅游一个月以上?（不包含下列国家和地区：' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '澳大利亚、加拿大、日本、新西兰、新加坡、文莱、马来西亚、韩国、法国、英国、德国、意大利、比利时、荷兰、爱尔兰、卢森堡、希腊、' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '西班牙、葡萄牙、丹麦、泰国、马尔代夫、斯里兰卡、瑞典、芬兰、阿根廷、巴西、摩纳哥、阿联酋、毛里求斯、塞舌尔）', null, 'Are you planning to reside or work abroad or travel for more than 30days within one year?' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '(except Australia; Canada; Japan; New Zealand; Singapore; Brunei; Malaysia; Korea; France;' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'the United Kingdom; German; Italy; Belgium; Holland; Ireland; Luxembourg; Greece; Spain;' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'Portuguesa; Denmark; Thailand; Maldives; Sri Lanka; Sweden; Finland; Argentina; Brazil; Monaco;' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'UAE; Mauritius; Seychelles)', null, 'notice1', 'noticeinfos', 'notice1', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select1', 'select1', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice1', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select2', 'select2', '投保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice1', 'appntquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice2', 'notice2', '您是否正在或计划参加危险运动,如深度潜水(超过20米)、跳伞、攀岩、野外探险、打猎、赛车、赛马、冲浪等?', null, 'Are you planning to take part in risky activity, such as diving to a depth of' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'over 20 meters, parachuting, mountaineering or rock climbing, exploration in field,' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'motor-racing, horse racing, surfing', null, 'notice2', 'noticeinfos', 'notice2', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select106', 'select106', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice2', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select107', 'select107', '投保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice2', 'appntquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice3', 'notice3', '目前是否有失明、聋哑或言语、咀嚼、四肢机能障碍或缺损或畸形、智能障碍?', null, 'At present, does the insured suffer for blindness, deaf-mute,' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'dysfunction or impairment with dysphonia, dysmasesis, dyskinesia,' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'or abnormality, intellectual impairment?', null, 'notice3', 'noticeinfos', 'notice3', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select108', 'select108', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice3', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select109', 'select109', '投保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice3', 'appntquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'InsuHight', 'InsuHight', '被保人身高（cm）', null, null, null, null, 'noticeinfos', 'notice3', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'AppHeight', 'AppHeight', '投保人身高（cm）', null, null, null, null, 'noticeinfos', 'notice3', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'InsuWeight', 'InsuWeight', '被保人体重（kg）', null, null, null, null, 'noticeinfos', 'notice3', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'AppWeight', 'AppWeight', '投保人体重（kg）', null, null, null, null, 'noticeinfos', 'notice3', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice4', 'notice4', '您是否有近亲属因疾病在60岁前身故？', null, 'Do you have any family history relevant in those your immediate family members died under age 60?' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '', null, 'notice4', 'noticeinfos', 'notice4', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select3', 'select3', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice4', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select110', 'select110', '投保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice4', 'appntquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'patient', 'patient', '患者', null, null, null, null, 'noticeinfos', 'notice4', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'etiology', 'etiology', '病因', null, null, null, null, 'noticeinfos', 'notice4', 'noticeInfo');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice5', 'notice5', '过去二年内是否曾因健康检查有异常而被建议接受复查或其他检查或治疗或是否曾接到' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '医生对您有关吸烟、饮酒的建议和告诫？', null, 'In the past 2 years, have you been' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'suggested having other check-up or treatment, or received suggestion' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'and advices from the doctor about drinking and smoking, because of' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'medical check-up anomaly?', null, 'notice5', 'noticeinfos', 'notice5', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select111', 'select111', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice5', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select112', 'select112', '投保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice5', 'appntquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'notice6', 'notice6', '过去三个月内是否曾因受伤或生病接受医生治疗 、诊疗或用药？', null, 'In the past 3 months,' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'have you received diagnosis and treat or medicines because of illness' || chr(10) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || '' || chr(9) || 'or injury?', null, 'notice6', 'noticeinfos', 'notice6', 'notice');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select113', 'select113', '被保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice6', 'insuquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('notice', 'select114', 'select114', '投保人', null, null, 'commonCombobox_notice', null, 'noticeinfos', 'notice6', 'appntquestion');
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('newContApply', 'grpcontno', 'grpcontno', '投保人客户号', 'text', null, null, null, 'newContApply', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('newContApply', 'insurancecom', 'insurancecom', '保险公司', 'text', null, null, null, 'newContApply', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('newContApply', 'riskcode', 'riskcode', '保险产品', 'text', null, null, null, 'newContApply', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'cityname', 'cityname', '签署地点', 'combobox', null, null, null, 'areacodefull', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'companyCode', 'companyCode', '网点号', 'combobox', null, null, null, 'sysuser', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'insurancecom', 'insurancecom', '保险公司代码', 'combobox', null, null, null, 'lccont', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'proposalcontno', 'proposalcontno', '投保单号码', 'combobox', null, null, null, 'lccont', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'agentcode', 'agentcode', '客户经理代码', 'combobox', null, null, null, 'lccont', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'agentname', 'agentname', '客户经理姓名', 'combobox', null, null, null, 'lccont', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'polapplydate', 'polapplydate', '投保日期', 'combobox', null, null, null, 'lccont', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'getpolmode', 'getpolmode', '保单递送方式', 'combobox', null, null, null, 'lccont', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'newbankaccno', 'newbankaccno', '客户账户', 'combobox', null, null, null, 'lccont', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'accountbalance', 'accountbalance', '账户余额', 'combobox', null, null, null, 'lccont', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'anotherHolderName', 'anotherHolderName', '另一持有人姓名', 'combobox', null, null, null, 'ldcustomeraccount', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'anotherHolderIdNo', 'anotherHolderIdNo', '另一持有人证件号', 'combobox', null, null, null, 'ldcustomeraccount', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'anotherHolderIdType', 'anotherHolderIdType', '另一持有人证件类型', 'combobox', null, null, null, 'ldcustomeraccount', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lccont', 'grpcontno', 'grpcontno', '隐藏(cifid)', 'combobox', null, null, null, 'lccont', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'postalflag', 'postalflag', '同居住地址', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcbnf', 'bnfno', 'bnfno', '受益人顺序', 'combobox', null, null, null, 'bnf', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcbnf', 'bnflot', 'bnflot', '受益人比例', null, null, null, null, 'bnf', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcbnf', 'name', 'name', '姓名', null, null, null, null, 'bnf', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcbnf', 'sex', 'sex', '性别', 'combobox', null, null, null, 'bnf', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcbnf', 'birthday', 'birthday', '出生日期', null, null, null, null, 'bnf', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcbnf', 'idtype', 'idtype', '证件类型', 'combobox', null, null, null, 'bnf', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcbnf', 'idno', 'idno', '证件号码', null, null, null, null, 'bnf', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcbnf_relationtoinsured', 'relationtoinsured', 'relationtoinsured', '与被保人的关系', 'combobox', null, null, null, 'bnf', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('krisk', 'riskcode', 'riskcode', '险种名称', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('krisk', 'prem', 'prem', '保费(元)', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('krisk', 'amnt', 'amnt', '基本保险金额(元)', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('krisk', 'mult', 'mult', '份数', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('krisk', 'insuyears', 'insuyears', '保险期间', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('krisk', 'payendyears', 'payendyears', '缴费期间', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('krisk', 'getform', 'getform', '年金领取方式', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('krisk', 'payintv', 'payintv', '缴费方式', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('krisk', 'bonusgetmode', 'bonusgetmode', '红利给付方式', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('frisk', 'riskcode', 'riskcode', '险种名称：', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('frisk', 'prem', 'prem', '保费：', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('frisk', 'amnt', 'amnt', '基本保险金额：', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('frisk', 'mult', 'mult', '份数：', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('frisk', 'insuyear', 'insuyear', '保险期间：', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('frisk', 'payendyear', 'payendyear', '缴费期间：', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('frisk', 'getform', 'getform', '年金领取方式：', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('frisk', 'payintv', 'payintv', '缴费方式：', 'combobox', null, null, null, 'lcpol', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('submit', 'delayedDate', 'delayedDate', '延迟扣款时间', 'combobox', null, null, null, 'lcCont', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'appntname', 'appntname', '姓名', 'combobox', null, null, null, 'lcappnt', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'idtype', 'idtype', '证件类型', 'combobox', null, null, null, 'lcappnt', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'idno', 'idno', '证件号码', 'combobox', null, null, null, 'lcappnt', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'appntsex', 'appntsex', '性别', 'combobox', null, null, null, 'lcappnt', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'appntenddate', 'appntenddate', '证件有效止期', 'combobox', null, null, null, 'lcappnt', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'appntbirthday', 'appntbirthday', '出生日期', 'combobox', null, null, null, 'lcappnt', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'nativeplace', 'nativeplace', '国籍', 'combobox', null, null, null, 'lcappnt', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'rgtaddress', 'rgtaddress', '个人年收入(万元)', 'combobox', null, null, null, 'lcappnt', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'salary', 'salary', '家庭年收入(万元)', 'combobox', null, null, null, 'lcappnt', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'premiumBudget', 'premiumBudget', '保费预算(万元)', 'combobox', null, null, null, 'lccont', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'occupationcode', 'occupationcode', '职业代码', 'combobox', null, null, null, 'lcappnt', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'company', 'company', '工作单位及名称', 'combobox', null, null, null, 'lcappnt', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'responsibility', 'responsibility', '职位及工作内容', 'combobox', null, null, null, 'lcappnt', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'mobile', 'mobile', '移动电话', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'email', 'email', 'E-mail', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'phone', 'phone', '家庭电话', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'creditgrade', 'creditgrade', '居民类型', 'combobox', null, null, null, 'lcappnt', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'postaladdress', 'postaladdress', '居住地址', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'zipcode', 'zipcode', '邮政编码', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'homeaddress', 'homeaddress', '联系地址', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'homezipcode', 'homezipcode', '邮政编码', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcappnt', 'goaltype', 'goaltype', '需求类型', 'combobox', null, null, null, 'ldcustomer', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('trancert', 'statement', 'statement', '投保人声明', 'combobox', null, null, null, 'taxrevenue', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('trancert', 'labelstatement', 'labelstatement', '居民税收释义', 'combobox', null, null, null, 'taxrevenue', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('trancert', 'desc', 'desc', '如在以上选项中勾选第2项或者第3项，请填写下列信息', 'combobox', null, null, null, 'taxrevenue', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('trancert', 'firstname', 'firstname', '姓（英文或拼音）', 'combobox', null, null, null, 'taxrevenue', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('trancert', 'lastname', 'lastname', '名（英文或拼音）', 'combobox', null, null, null, 'taxrevenue', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'relationtoappnt', 'relationtoappnt', '投保人与被保人关系', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'lcinsuredname', 'lcinsuredname', '姓名', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'lcinsuredidtype', 'lcinsuredidtype', '证件类型', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'lcinsuredidno', 'lcinsuredidno', '证件号码', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'lcinsuredsex', 'lcinsuredsex', '性别', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'insureidenddate', 'insureidenddate', '证件有效止期', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'lcinsuredbirthday', 'lcinsuredbirthday', '出生日期', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'lcinsurednativeplace', 'lcinsurednativeplace', '国籍', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'lcinsuredroccupationcode', 'lcinsuredroccupationcode', '职业代码', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'lcinsuredcompany', 'lcinsuredcompany', '工作单位及名称', 'combobox', null, null, null, 'lcinsured', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'mobile', 'mobile', '移动电话', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'phone', 'phone', '家庭电话', 'combobox', null, null, null, 'lcaddress', null, null);
insert into FORMELEMENT (sid, id, name, text, type, englishtext, checkboxoption, cssclass, groupid, parentid, noticeelementgroup)
values ('lcinsured', 'email', 'email', 'E-mail', 'combobox', null, null, null, 'lcaddress', null, null);
prompt 168 records loaded
set feedback on
set define on
prompt Done.
