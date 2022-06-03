const initalCart = {
    cartProduct:false,
    cartTotal: JSON.parse(localStorage.getItem("cart")) || null,
    checkCart: JSON.parse(localStorage.getItem("check")),
    cartProductList: []
}

const cartReducer = (state = initalCart, action) => {
    switch(action.type){
        case "ADDITEMTOCART":{
            let cartProductListTmp = state.cartProductList
            console.log("ADDITEMTOCART")
            console.log(cartProductListTmp)
            console.log(action.payload)
            return {
                ...state,
                cartProductList: action.payload
            }
        }
        case "QUATITY":{
            let quantityProduct = state.cartProduct
            return{
                ...state,
                cartProduct: !quantityProduct
            }
        }
        case "CHECK":{
            let checkProduct = state.cartProduct
            checkProduct = action.payload
            localStorage.setItem("check", JSON.stringify(checkProduct))
            return{
                ...state,
                checkCart: checkProduct
            }
        }
        case "TOTALCART":{
            let newTotal = state.cartTotal
            
            if(action.payload === null){
                newTotal = null
            }
            newTotal = action.payload
            localStorage.setItem("cart" ,JSON.stringify(newTotal))
            return{
                ...state,
                cartTotal: newTotal
            }
        }    
        default:
            return state
    }   
}

export default cartReducer





USE qltknh;

  
CREATE TABLE Branch(
    BranchID varchar(45) not null,
    BranchName varchar(45) not null,
    BranchNumber varchar(45) not null,
    Email varchar(45) not null,
    PRIMARY KEY (BranchID)
);

INSERT INTO Branch 
  (BranchID, BranchName, BranchNumber, Email)
VALUES 
  ('cnhn', 'chi nhanh ha noi', '0349868441', 'hanoi@gov.vn'),
  ('cnqn', 'chi nhanh quang ninh', '0349868442', 'quangninh@gov.vn'),
  ('cnbn', 'chi nhanh bac ninh', '0349868443', 'bacninh@gov.vn'),
  ('cnvp', 'chi nhanh vinh phuc', '0349868444', 'vinhphuc@gov.vn'),
  ('cntb', 'chi nhanh thai binh', '0349868445', 'thaibinh@gov.vn'),
  ('cnhy', 'chi nhanh hung yen', '0349868446', 'hungyen@gov.vn'),
  ('cnnd', 'chi nhanh nam dinh', '0349868447', 'namdinh@gov.vn'),
  ('cnnb', 'chi nhanh ninh binh', '0349868448', 'ninhbinh@gov.vn'),
  ('cnhp', 'chi nhanh hai phong', '0349868449', 'haiphong@gov.vn');
  
CREATE TABLE Customer(
    CustomerID varchar(45) not null,
    Name varchar(45) not null,
    Phone varchar(45) not null,
    Email varchar(45) not null,
    DateRegister date not null,
    Username varchar(45) not null unique,
    Password varchar(45) not null,
    CustomerType varchar(45) not null,
    PRIMARY KEY (CustomerID)
);



INSERT INTO Customer 
  (CustomerID, Name, Phone, Email, DateRegister, Username, Password, CustomerType)
VALUES 
  ('cus0001', 'tung1', '111', 'tung1@gmail.com', '04-11-2022', 'tungkhong1', 'tungkhong1pass', '1'),
  ('cus0002', 'tung2', '112', 'tung2@gmail.com', '04-12-2022', 'tungkhong2', 'tungkhong2pass', '2'),
  ('cus0003', 'tung3', '113', 'tung3@gmail.com', '04-13-2022', 'tungkhong3', 'tungkhong3pass', '1');

CREATE TABLE Account(
    AccountID varchar(45) not null,
    Balance double not null,
    AccountName varchar(45) not null,
    AccountType varchar(45) not null,
    BranchID varchar(45) not null,
    CustomerID varchar(45) not null,
    foreign key (BranchID) references Branch(BranchID),
    foreign key (CustomerID) references Customer(CustomerID),
    PRIMARY KEY (AccountID, BranchID, CustomerID)
);

INSERT INTO Account 
  (AccountID, Balance, AccountName, AccountType, BranchID, CustomerID)
VALUES 
  ('hna00001', 1000, 'manhtunghn1', 'vip', 'cnhn', 'cus0001'),
  ('hna00002', 1000, 'manhtunghn2', 'nor', 'cnhn', 'cus0001'),
  ('qna00001', 1000, 'manhtungqn1', 'nor', 'cnqn', 'cus0001'),
  ('qna00002', 1000, 'manhtungqn2', 'nor', 'cnqn', 'cus0001'),
  ('bna00001', 1000, 'manhtungbn1', 'nor', 'cnbn', 'cus0001'),
  ('bna00002', 1000, 'manhtungbn2', 'nor', 'cnbn', 'cus0001'),
  ('vpa00001', 1000, 'manhtungvp1', 'vip', 'cnvp', 'cus0002'),
  ('vpa00002', 1000, 'manhtungvp2', 'vip', 'cnvp', 'cus0002'),
  ('tba00001', 1000, 'manhtungtb1', 'vip', 'cntb', 'cus0002'),
  ('tba00002', 1000, 'manhtungtb2', 'vip', 'cntb', 'cus0002'),
  ('hya00001', 1000, 'manhtunghy1', 'nor', 'cnhy', 'cus0002'),
  ('hya00002', 1000, 'manhtunghy2', 'nor', 'cnhy', 'cus0002'),
  ('nda00001', 1000, 'manhtungnd1', 'vip', 'cnnd', 'cus0003'),
  ('nda00002', 1000, 'manhtungnd2', 'vip', 'cnnd', 'cus0003'),
  ('nba00001', 1000, 'manhtungnb1', 'nor', 'cnnb', 'cus0003'),
  ('nba00002', 1000, 'manhtungnb2', 'nor', 'cnnb', 'cus0003'),
  ('hpa00001', 1000, 'manhtunghp1', 'vip', 'cnhp', 'cus0003'),
  ('hpa00002', 1000, 'manhtunghp2', 'vip', 'cnhp', 'cus0003');

CREATE TABLE TransactionType(
    TransactionTypeID varchar(45) not null,
    TransactionType varchar(45) not null,
    PRIMARY KEY (TransactionTypeID)
);

INSERT INTO TransactionType 
  (TransactionTypeID, TransactionType)
VALUES 
  ('trty001', 'nhanh'),
  ('trty002', 'thuong');

CREATE TABLE TransactionTransfer(
    TransactionTransferID varchar(45) not null,
    Date date not null,
    TransferMoney double not null,
    SenderAccountID varchar(45) not null,
    ReceiverAccountID varchar(45) not null,
    TransactionTypeID varchar(45) not null,
	foreign key (SenderAccountID) references Account(AccountID),
    foreign key (ReceiverAccountID) references Account(AccountID),
    foreign key (TransactionTypeID) references TransactionType(TransactionTypeID),
    PRIMARY KEY (TransactionTransferID, SenderAccountID, ReceiverAccountID, TransactionTypeID)
);

INSERT INTO TransactionTransfer 
  (TransactionTransferID, Date, TransferMoney, SenderAccountID, ReceiverAccountID, TransactionTypeID)
VALUES 
  ('trtr00001', '04-14-2022', 100, 'hna00001', 'hna00002', 'trty001'),
  ('trtr00002', '04-14-2022', 100, 'qna00001', 'qna00002', 'trty002'),
  ('trtr00003', '04-14-2022', 100, 'bna00001', 'bna00002', 'trty001'),
  ('trtr00004', '04-14-2022', 100, 'vpa00001', 'vpa00002', 'trty001'),
  ('trtr00005', '04-14-2022', 100, 'tba00001', 'tba00002', 'trty002'),
  ('trtr00006', '04-14-2022', 100, 'hya00001', 'hya00002', 'trty001'),
  ('trtr00007', '04-14-2022', 100, 'nda00001', 'nda00002', 'trty001'),
  ('trtr00008', '04-14-2022', 100, 'nba00001', 'nba00002', 'trty002'),
  ('trtr00009', '04-14-2022', 100, 'hpa00001', 'hpa00002', 'trty001');

CREATE TABLE Provider(
    ProviderID varchar(45) not null,
    Name varchar(45) not null,
    Phone varchar(45) not null,
    Email varchar(45) not null,
    PRIMARY KEY (ProviderID)
);

INSERT INTO Provider 
  (ProviderID, Name, Phone, Email)
VALUES 
  ('pr001', 'cung cap nuoc 1', '111', 'nuoc1@gmail.com'),
  ('pr002', 'cung cap dien 1', '222', 'dien1@gmail.com'),
  ('pr003', 'cung cap xang 1', '333', 'xang1@gmail.com'),
  ('pr004', 'cung cap xang 2', '444', 'xang2@gmail.com');

CREATE TABLE ServiceType(
    ServiceTypeID varchar(45) not null,
    ServiceName varchar(45) not null,
    PRIMARY KEY (ServiceTypeID)
);

INSERT INTO ServiceType 
  (ServiceTypeID, ServiceName)
VALUES 
  ('serty001', 'nuoc'),
  ('serty002', 'dien'),
  ('serty003', 'xang');

CREATE TABLE Service(
    ServiceID varchar(45) not null,
    ProviderID varchar(45) not null,
    ServiceTypeID varchar(45) not null,
    foreign key (ProviderID) references Provider(ProviderID),
    foreign key (ServiceTypeID) references ServiceType(ServiceTypeID),
    PRIMARY KEY (ServiceID, ProviderID, ServiceTypeID)
);

INSERT INTO Service 
  (ServiceID, ProviderID, ServiceTypeID)
VALUES 
  ('ser001', 'pr001', 'serty001'),
  ('ser002', 'pr002', 'serty002'),
  ('ser003', 'pr003', 'serty003'),
  ('ser004', 'pr004', 'serty003');

CREATE TABLE TransactionPay(
    TransactionPayID varchar(45) not null,
    CustomerCode varchar(45) not null,
    Date date not null,
    PayMoney double not null,
    AccountID varchar(45) not null,
    ServiceID varchar(45) not null,
    foreign key (AccountID) references Account(AccountID),
    foreign key (ServiceID) references Service(ServiceID),
    PRIMARY KEY (TransactionPayID, AccountID, ServiceID)
);


INSERT INTO TransactionPay 
  (TransactionPayID, CustomerCode, Date, PayMoney, AccountID, ServiceID)
VALUES 
  ('trpa001', 'code1', '04-15-2022', 100, 'hna00001', 'ser001'),
  ('trpa002', 'code1', '04-15-2022', 100, 'qna00001', 'ser002'),
  ('trpa003', 'code2', '04-15-2022', 100, 'bna00001', 'ser003'),
  ('trpa004', 'code2', '04-15-2022', 100, 'vpa00001', 'ser004'),
  ('trpa005', 'code2', '04-15-2022', 100, 'tba00001', 'ser004'),
  ('trpa006', 'code2', '04-15-2022', 100, 'hya00001', 'ser002'),
  ('trpa007', 'code3', '04-15-2022', 100, 'nda00001', 'ser002'),
  ('trpa008', 'code3', '04-15-2022', 100, 'nba00001', 'ser003'),
  ('trpa009', 'code4', '04-15-2022', 100, 'hpa00001', 'ser003');

