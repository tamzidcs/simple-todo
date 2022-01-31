--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.app_user (
    id integer NOT NULL,
    username character varying(64),
    app_password character varying(128)
);


ALTER TABLE public.app_user OWNER TO postgres;

--
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    id integer NOT NULL,
    title character varying(200),
    description character varying(500),
    status character varying(100)
);


ALTER TABLE public.task OWNER TO postgres;

--
-- Name: task_app_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task_app_user (
    user_id integer NOT NULL,
    task_id integer NOT NULL
);


ALTER TABLE public.task_app_user OWNER TO postgres;

--
-- Name: task_user_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_user_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_user_task_id_seq OWNER TO postgres;

--
-- Name: task_user_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_user_task_id_seq OWNED BY public.task_app_user.task_id;


--
-- Name: task_user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_user_user_id_seq OWNER TO postgres;

--
-- Name: task_user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_user_user_id_seq OWNED BY public.task_app_user.user_id;


--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.task.id;


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.app_user.id;


--
-- Name: app_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: task id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: task_app_user user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_app_user ALTER COLUMN user_id SET DEFAULT nextval('public.task_user_user_id_seq'::regclass);


--
-- Name: task_app_user task_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_app_user ALTER COLUMN task_id SET DEFAULT nextval('public.task_user_task_id_seq'::regclass);


--
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.app_user (id, username, app_password) FROM stdin;
8	usr1	123456
9	usr2	123456
10	usr3	123456
\.


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (id, title, description, status) FROM stdin;
61	Task 3	Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc 	open
59	Task 1	Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc 	done
60	Task 2	Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc Desc 	done
\.


--
-- Data for Name: task_app_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task_app_user (user_id, task_id) FROM stdin;
8	59
8	60
8	61
9	60
\.


--
-- Name: task_user_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_user_task_id_seq', 1, false);


--
-- Name: task_user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_user_user_id_seq', 1, false);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 61, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 10, true);


--
-- Name: task id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT id PRIMARY KEY (id);


--
-- Name: app_user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: fki_task_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_task_id ON public.task_app_user USING btree (task_id);


--
-- Name: fki_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_user_id ON public.task_app_user USING btree (user_id);


--
-- Name: task_app_user task_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_app_user
    ADD CONSTRAINT task_id FOREIGN KEY (task_id) REFERENCES public.task(id) NOT VALID;


--
-- Name: task_app_user user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_app_user
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.app_user(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

